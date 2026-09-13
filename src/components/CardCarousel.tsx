"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 가로로 넘기는 카드 목록.
 *
 * 항목 하나가 카드 하나입니다. 카드 좌우의 화살표를 누르면 옆 카드로 부드럽게
 * 넘어갑니다. 좁은 화면에서는 좌우에 화살표를 둘 자리가 없어 카드 아래로 내립니다.
 *
 * `index` 를 넘기면 바깥(예: 왼쪽 시술 이름 목록)에서도 카드를 고를 수 있습니다.
 * 그렇게 고르든 화살표로 넘기든 손가락으로 쓸든 현재 카드는 하나로 유지되고,
 * 바뀔 때마다 `onIndexChange` 로 알려 줍니다.
 *
 * 직접 위치를 계산해 `transform` 을 거는 대신 **네이티브 가로 스크롤 +
 * scroll-snap** 위에 화살표를 얹었습니다. 그래야 손가락으로 쓸어 넘기기,
 * 트랙패드 두 손가락 밀기, 키보드 좌우 키가 코드 한 줄 없이 그대로 동작하고,
 * 화면 폭이 바뀌어도 위치가 어긋나지 않습니다. 화살표는 `scrollTo` 를 부를 뿐입니다.
 *
 * 카드는 한 번에 한 장만 보입니다. 흰 바탕에 그림자로 경계를 만들고, 그림자는
 * 레일의 `overflow-x` 에 잘리므로 레일 안쪽에 여백(`px-3 py-5`)을 두고, 스냅
 * 기준도 `scroll-px-3` 으로 같이 옮겨 첫 장이 왼쪽 여백만큼 밀리지 않게 했습니다.
 *
 * 스크롤바는 감추고(`card-rail`) 대신 화살표와 "2 / 5" 표시를 둡니다. 감춘 만큼
 * 목록 자체를 `tabIndex=0` 으로 두어 키보드로도 스크롤할 수 있게 했습니다.
 */

export type CarouselCard = {
  title: string;
  /** 제목 **옆**에 붙는 짧은 부가 설명. "위 어금니 뼈가 부족할 때" 같은 것. */
  lead?: string;
  body?: string;
  points?: readonly string[];
  /**
   * 글이 함께 있으면 카드 아래쪽에 눕고, 글이 없으면 카드를 꽉 채웁니다.
   * `width`/`height` 는 `ownRatio` 일 때 카드 비율을 정하는 데 씁니다.
   */
  image?: { src: string; alt: string; width?: number; height?: number };
  /**
   * 그림이 앞으로도 들어올 일이 없는 글만 있는 카드면 `true`. 아래쪽 그림
   * 자리를 아예 두지 않습니다. 시술 카드는 그림이 아직 없더라도 이 칸을
   * 비워 둬야 넘길 때 그림 높이가 흔들리지 않으므로 붙이지 마세요.
   */
  plain?: boolean;
  /**
   * 왼쪽 목록에서 한 단 들여쓸 하위 항목이면 `true`. 카드 자체는 달라지지
   * 않고 목록에서의 자리만 바뀝니다("교정 방식" 밑의 클리피씨·투명 교정).
   */
  sub?: boolean;
  /**
   * 사진 한 장으로 대신할 수 없는 카드에만 씁니다. 구조도(SVG)나 단계 목록처럼
   * 짜임이 있는 내용이 여기 들어갑니다. `node` 가 있으면 아래쪽 그림 칸 대신
   * 이 내용이 글 바로 밑에 놓이고, 높이는 내용이 정합니다.
   */
  node?: ReactNode;
};

export default function CardCarousel({
  items,
  label,
  index,
  onIndexChange,
  /** 카드 높이의 바닥. 너비 대비 비율(%)입니다. 기본은 6:4(가로가 긴 쪽). */
  ratio = 66.667,
  /**
   * 사진만 있는 목록처럼 카드마다 제 비율을 지켜야 하면 `true`.
   * 카드 높이를 서로 맞추지 않고 사진 원래 비율 그대로 둡니다.
   */
  ownRatio = false,
}: {
  items: readonly CarouselCard[];
  /** 목록이 무엇인지 알려 주는 이름. 화면에는 안 보이고 보조기기만 읽습니다. */
  label: string;
  index?: number;
  onIndexChange?: (next: number) => void;
  ratio?: number;
  ownRatio?: boolean;
}) {
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
      const next = Math.round(rail.scrollLeft / step);
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

  const go = useCallback((to: number) => {
    const rail = railRef.current;
    const card = rail?.children[to] as HTMLElement | undefined;
    const first = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card || !first) return;
    /*
     * behavior 를 반드시 명시합니다. 생략하면 CSS 의 `scroll-behavior: smooth` 를
     * 따라야 하는데, 버튼 클릭 안에서 부를 때 넘어가지 않는 경우가 있습니다.
     */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  /* 바깥에서 카드를 고른 경우. 이미 그 자리면 아무것도 하지 않습니다. */
  useEffect(() => {
    if (index === undefined || index === currentRef.current) return;
    go(index);
  }, [index, go]);

  return (
    /*
     * `min-w-0` 이 없으면 이 덩이가 바깥 칸(그리드 한 칸)보다 넓어집니다.
     * 그리드 칸 안의 항목은 기본값이 `min-width: auto` 라서 안쪽 카드들의
     * 최소 너비를 전부 더한 만큼 벌어지고, 그 결과 좁은 화면에서 화면 전체가
     * 가로로 밀려 나갑니다. 카드 수가 늘수록 심해집니다.
     */
    <div className="min-w-0">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* 좁은 화면에서는 카드가 너무 좁아지므로 좌우 화살표를 감춥니다. */}
        <Arrow
          direction="prev"
          disabled={edge.start}
          onClick={() => go(current - 1)}
          className="hidden sm:flex"
        />

        <ul
          ref={railRef}
          tabIndex={0}
          aria-label={label}
          className={`card-rail flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-3 px-3 py-5 ${
            ownRatio ? "items-start" : ""
          }`}
        >
          {items.map((item) => {
            const withText = Boolean(item.body || item.points || item.node);
            const pad =
              ownRatio && item.image?.width && item.image?.height
                ? (item.image.height / item.image.width) * 100
                : ratio;

            return (
              <li
                key={item.title}
                className="card-shell relative w-full shrink-0 snap-start overflow-hidden rounded-3xl bg-page shadow-[12px_12px_24px_-10px_rgba(22,32,43,0.28)]"
              >
                {/* 높이만 만드는 지지대. 글이 더 길면 글 쪽이 이깁니다. */}
                <div
                  aria-hidden
                  className="card-ratio"
                  style={{ paddingTop: `${pad}%` }}
                />

                {withText ? (
                  /*
                   * 카드 속은 기본이 가운데 정렬입니다(`.card-shell`). 글이
                   * 짧아도 그림 칸이 아래를 받치고 있어 대개 티가 나지 않지만,
                   * 그림 칸이 없는 `plain` 카드는 글 한 덩이가 카드 한가운데
                   * 떠 보입니다. 그 카드만 위로 붙여 다른 카드와 줄을 맞춥니다.
                   */
                  <div
                    className={`flex flex-col ${item.plain ? "self-start" : ""}`}
                  >
                    <div className={`px-7 pt-6 ${item.node ? "pb-7" : "pb-4"}`}>
                      {/* 시술명과 부가 설명을 한 줄에. 좁으면 아래로 접힙니다. */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="heading text-xl">{item.title}</h3>
                        {item.lead && (
                          <p className="text-sm text-faint">{item.lead}</p>
                        )}
                      </div>
                      {/*
                        카드 안에서는 `prose-ko`(행간 1.9)를 쓰지 않습니다.
                        카드가 세로로 너무 길어집니다.
                      */}
                      {item.body && (
                        <p className="mt-4 text-sm leading-[1.6] text-muted">
                          {item.body}
                        </p>
                      )}
                      {item.points && (
                        <ul className="mt-4 space-y-1 text-sm leading-[1.6] text-muted">
                          {item.points.map((pt) => (
                            <li key={pt} className="flex gap-2.5">
                              <span aria-hidden className="text-blue">
                                ·
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/*
                        구조도나 단계 목록처럼 짜임이 있는 내용. 그림 칸과 달리
                        높이를 미리 잡지 않고 내용이 정하게 둡니다.
                      */}
                      {item.node && <div className="mt-5">{item.node}</div>}
                    </div>

                    {/*
                      시술 그림 자리. 그림이 아직 없는 항목도 이 칸을 그대로
                      비워 두어야 카드끼리 짜임이 어긋나지 않습니다.
                      도해는 잘리면 뜻이 달라지므로 `object-contain` 으로
                      통째로 보여 줍니다. 글과 그림 사이에 괘선은 두지 않습니다.
                      `node` 로 다른 내용을 채웠거나 `plain` 인 카드는 뺍니다.
                    */}
                    {!item.node && !item.plain && (
                      <div className="relative mt-auto h-44 sm:h-56">
                        {item.image && (
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            sizes="(min-width: 640px) 40rem, 100vw"
                            className="object-contain p-3"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  item.image && (
                    <>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 640px) 40rem, 100vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-6 pb-5 pt-16 text-sm text-page">
                        {item.title}
                      </figcaption>
                    </>
                  )
                )}
              </li>
            );
          })}
        </ul>

        <Arrow
          direction="next"
          disabled={edge.end}
          onClick={() => go(current + 1)}
          className="hidden sm:flex"
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <Arrow
          direction="prev"
          disabled={edge.start}
          onClick={() => go(current - 1)}
          className="flex sm:hidden"
        />
        <p className="text-sm tabular-nums text-faint">
          <span className="sr-only">{label} </span>
          {current + 1} / {items.length}
        </p>
        <Arrow
          direction="next"
          disabled={edge.end}
          onClick={() => go(current + 1)}
          className="flex sm:hidden"
        />
      </div>
    </div>
  );
}

function Arrow({
  direction,
  disabled,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  className: string;
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
