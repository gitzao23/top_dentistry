"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 가로로 넘기는 목록의 공통 부품 — 스크롤 위치 추적(`useRail`)과 화살표(`Arrow`).
 *
 * 카드 캐러셀(`CardCarousel`)과 진료 원칙 레일(`PrincipleRail`)이 함께 씁니다.
 * 둘 다 **네이티브 가로 스크롤 + scroll-snap** 위에 화살표만 얹는 방식이라,
 * 손가락으로 쓸어 넘기기·트랙패드·키보드 좌우 키가 코드 없이 그대로 동작합니다.
 */

/** 카드를 화면 세로 가운데로 올릴 때 비워 둘 위아래 자리. */
const HEADER_H = 80; // sticky 헤더(h-20)
const CALLBAR_H = 72; // 폰 화면 아래에 고정된 전화바(p-3 + min-h-12)

/**
 * 왼쪽 이름 목록이 카드 **위로** 쌓이는 구간. `lg` 미만에서는 이름을 눌러도
 * 카드가 화면 밖에 있어, 누른 뒤 그 카드를 화면 가운데로 올려 줘야 합니다.
 * `lg` 이상은 이름과 카드가 좌우로 나란히 있어 세로로 움직일 이유가 없습니다.
 */
const STACKED = "(max-width: 1023.98px)";

/** 카드 한 장을 화면(헤더와 전화바 사이)의 세로 가운데로 올립니다. */
function centerInView(card: HTMLElement, behavior: ScrollBehavior) {
  const rect = card.getBoundingClientRect();
  const band = window.innerHeight - HEADER_H - CALLBAR_H;
  /*
   * 카드가 띠보다 크면 가운데를 맞출 수 없습니다. 그때는 윗변을 헤더 바로
   * 밑에 붙여, 적어도 카드가 제목부터 읽히도록 합니다.
   */
  const gap = Math.max((band - rect.height) / 2, 8);
  window.scrollTo({
    top: window.scrollY + rect.top - HEADER_H - gap,
    behavior,
  });
}

/**
 * 레일 하나를 다룹니다.
 *
 * `index` 를 넘기면 바깥(예: 왼쪽 시술 이름 목록)에서도 카드를 고를 수 있고,
 * 그렇게 고른 경우에만 카드를 화면 세로 가운데로 함께 올립니다. 화살표로
 * 넘길 때는 이미 카드를 보고 있는 상태이므로 세로로 움직이지 않습니다.
 */
export function useRail({
  index,
  onIndexChange,
}: {
  index?: number;
  onIndexChange?: (next: number) => void;
} = {}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  /*
   * 화살표를 끄는 기준은 카드 번호가 아니라 **실제로 더 굴릴 수 있는지**입니다.
   * 번호만 보고 판단하면 마지막 카드가 이미 다 보이는데도 눌러도 아무 일이 없는
   * 화살표가 켜져 있게 됩니다.
   */
  const [edge, setEdge] = useState({ start: true, end: true });

  /* 스크롤 핸들러 안에서 최신 값을 보려고 ref 에 같이 담아 둡니다. */
  const currentRef = useRef(0);
  const notifyRef = useRef(onIndexChange);
  useEffect(() => {
    notifyRef.current = onIndexChange;
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const sync = () => {
      const first = rail.firstElementChild as HTMLElement | null;
      if (!first) return;
      // 카드 폭 + 간격. gap 을 따로 읽지 않으려고 두 카드의 위치 차이로 구합니다.
      const second = first.nextElementSibling as HTMLElement | null;
      const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
      const next = step > 0 ? Math.round(rail.scrollLeft / step) : 0;
      if (next !== currentRef.current) {
        currentRef.current = next;
        setCurrent(next);
        notifyRef.current?.(next);
      }
      setEdge({
        start: rail.scrollLeft <= 1,
        end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1,
      });
    };

    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    // 화면 폭이 바뀌면 카드 크기가 달라져 기준 위치도 달라집니다.
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, []);

  const go = useCallback((to: number, options?: { center?: boolean }) => {
    const rail = railRef.current;
    const card = rail?.children[to] as HTMLElement | undefined;
    const first = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card || !first) return;
    /*
     * behavior 를 반드시 명시합니다. 생략하면 CSS 의 `scroll-behavior: smooth` 를
     * 따라야 하는데, 버튼 클릭 안에서 부를 때 넘어가지 않는 경우가 있습니다.
     */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    rail.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior });
    if (options?.center && window.matchMedia(STACKED).matches) {
      centerInView(card, behavior);
    }
  }, []);

  /* 바깥에서 카드를 고른 경우. 이미 그 자리면 가로로는 움직일 일이 없습니다. */
  useEffect(() => {
    if (index === undefined || index === currentRef.current) return;
    go(index, { center: true });
  }, [index, go]);

  return { railRef, current, edge, go };
}

export function Arrow({
  direction,
  disabled,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  const prev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={prev ? "이전 카드" : "다음 카드"}
      className={`size-11 shrink-0 items-center justify-center rounded-full border border-rule bg-page text-ink transition-colors hover:border-ink disabled:cursor-default disabled:border-rule disabled:text-rule ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={prev ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
