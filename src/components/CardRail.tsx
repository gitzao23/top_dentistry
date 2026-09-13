"use client";

import { useState } from "react";
import CardCarousel, { type CarouselCard } from "./CardCarousel";

/**
 * 카드 목록 섹션 — 왼쪽에 제목과 항목 이름, 오른쪽에 카드.
 * 임플란트·치아교정·병원 둘러보기 세 덩이가 이 짜임을 함께 씁니다.
 *
 * 왼쪽 이름을 누르면 오른쪽 카드가 그 항목으로 넘어갑니다. 반대로 화살표나
 * 손가락으로 카드를 넘기면 왼쪽에서 지금 보고 있는 이름에 표시가 옮겨 갑니다.
 * 두 쪽이 같은 번호 하나를 보고 움직이므로 어느 쪽으로 조작해도 어긋나지 않습니다.
 */
export default function CardRail({
  title,
  lead,
  items,
  label,
}: {
  title: string;
  lead: string;
  items: readonly CarouselCard[];
  label: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    <section className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:py-20 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        {/*
          카드 레일이 그림자 자리로 위에 여백(py-5)을 두므로, 제목을 칸 맨 위에
          붙이면 카드보다 한참 높이 떠 보입니다. 그만큼 내려 맞춥니다.
        */}
        <div className="lg:pt-5">
          <h2 className="heading text-2xl sm:text-3xl">{title}</h2>
          <p className="prose-ko mt-4 text-sm text-muted">{lead}</p>

          <ul className="mt-6 border-t border-rule">
            {items.map((item, i) => {
              const on = i === index;
              return (
                <li key={item.title} className="border-b border-rule">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={on ? "true" : undefined}
                    className={`flex min-h-12 w-full items-center gap-3 text-left text-sm transition-colors ${
                      on ? "font-bold text-blue" : "text-muted hover:text-ink"
                    }`}
                  >
                    {/* 지금 보고 있는 항목에만 서는 짧은 선 */}
                    <span
                      aria-hidden
                      className={`h-px w-4 shrink-0 transition-colors ${
                        on ? "bg-blue" : "bg-rule"
                      }`}
                    />
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <CardCarousel
          items={items}
          label={label}
          index={index}
          onIndexChange={setIndex}
        />
      </div>
    </section>
  );
}
