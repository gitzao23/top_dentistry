"use client";

import { principles } from "@/content/clinic";
import { Arrow, useRail } from "./rail";

/**
 * 진료 원칙 여섯 가지.
 *
 * 넓은 화면은 지금까지처럼 두 줄짜리 격자입니다. 폰 화면에서는 여섯 장을
 * 세로로 쌓으면 화면을 여섯 번 내려야 해서, 임플란트·치아교정과 같은 방식으로
 * 옆으로 넘겨 봅니다.
 *
 * 격자와 레일을 따로 그리지 않고 **목록 하나**에 서로 다른 옷을 입혔습니다.
 * 둘을 각각 두고 `hidden` 으로 감추면 같은 글이 화면에 두 번 들어가, 읽어 주는
 * 기계와 검색엔진이 원칙을 열두 개로 봅니다.
 *
 * 화살표와 "2 / 6" 표시는 레일일 때만 뜻이 있으므로 `sm` 부터 감춥니다.
 */
export default function PrincipleRail() {
  const { railRef, current, edge, go } = useRail();

  return (
    <>
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label="진료 원칙"
        className="card-rail mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-3 px-3 py-4 sm:mt-10 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:gap-5 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3"
      >
        {principles.map((p, i) => (
          <li
            key={p.title}
            className="w-full shrink-0 snap-start rounded-3xl bg-page p-6 shadow-[12px_12px_24px_-10px_rgba(22,32,43,0.28)] sm:w-auto sm:p-7"
          >
            <p className="text-xs tracking-[0.14em] text-faint">
              원칙 {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="heading mt-2 text-[1.0625rem] sm:mt-3">{p.title}</h3>
            {/*
              `prose-ko`(행간 1.9)를 쓰지 않고 값을 직접 적습니다. 그 클래스는
              레이어 밖에 있어 Tailwind 의 `leading-*` 보다 세고, 그래서 폰
              화면에서만 행간을 줄이는 일이 통하지 않습니다.
            */}
            <p className="mt-2 text-sm leading-[1.7] text-muted sm:mt-3 sm:leading-[1.9]">
              {p.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
        <Arrow
          direction="prev"
          disabled={edge.start}
          onClick={() => go(current - 1)}
        />
        <p className="text-sm tabular-nums text-faint">
          <span className="sr-only">진료 원칙 </span>
          {current + 1} / {principles.length}
        </p>
        <Arrow
          direction="next"
          disabled={edge.end}
          onClick={() => go(current + 1)}
        />
      </div>
    </>
  );
}
