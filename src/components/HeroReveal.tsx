"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/content/clinic";

/**
 * 히어로 — 바탕색에서 배경 영상이 번져 나옵니다.
 *
 * 영상은 처음부터 화면 전체 크기(최종 크기)로 깔려 있습니다. 마스크로 가운데
 * 인물 주변만 또렷하게 두고 바깥은 페이지 바탕색으로 덮어 두었다가, 페이지가
 * 뜨면 **저절로** 또렷한 영역을 바깥으로 넓힙니다. 넓어지는 가장자리는 마스크의
 * 그라데이션을 지나면서 희미한 상태에서 점점 진해집니다.
 *
 * 스크롤과는 아무 상관이 없습니다. 스크롤을 막지 않고, 보는 사람이 그 사이
 * 아래로 내려가 버려도 연출은 알아서 끝까지 갑니다.
 *
 * 크기가 변하는 요소가 없으므로 레이아웃은 처음부터 끝까지 그대로입니다.
 * 제목·본문·전화 버튼도 첫 프레임부터 제자리에 있고 색도 변하지 않습니다.
 * 글자가 얹히는 아래쪽에는 **바탕색 그라데이션**을 항상 깔아 둡니다. 번지기
 * 전에는 어차피 바탕색이라 보이지 않고, 다 번진 뒤에는 영상을 덮어 먹색 글자가
 * 그대로 읽힙니다. 글자색을 먹색↔흰색으로 건너가게 하면 중간 어딘가에서
 * 글자색과 배경색이 같아지는 지점이 반드시 생기므로 그 방법은 쓰지 않았습니다.
 *

 * `prefers-reduced-motion: reduce` 이면 globals.css 의 `.hero-reveal` 규칙이
 * 마스크를 통째로 꺼서 처음부터 다 번진 상태로 보여 줍니다. JS 가 한 프레임
 * 늦게 실행돼도 깜빡임이 없도록 CSS 쪽에서 처리합니다.
 */

/*
 * 영상 오른쪽 위에 제작 도구 워터마크가 박혀 있습니다.
 * (원본 1280×720 기준 x 1079~1244, y 35~58 — 8초 내내 같은 자리)
 * 영상 파일에서 지울 방법이 없어 위쪽 11%(79px)를 잘라 냅니다.
 * 잘라낸 만큼 세로로 키우고 그만큼 끌어올려 아래 끝을 화면 아래 끝에 맞춥니다.
 */
/* 번지기 전에 인물만 보여 주는 시간과, 다 번지는 데 걸리는 시간. */
const HOLD_MS = 400;
const REVEAL_MS = 1800;

const CROP_TOP = 0.11;
const VIDEO_H = 100 / (1 - CROP_TOP); // 112.36%

/*
 * 마스크 타원의 시작값과 끝값.
 * rx·ry 는 각각 너비·높이 기준 반지름(%), core 는 아직 완전히 또렷한 지점
 * (타원 반지름의 %), outer 는 타원 바깥의 불투명도입니다.
 *
 * 시작값은 인물이 통째로 또렷한 영역 안에 들어가도록 잡았습니다. 인물이 잘린
 * 채 시작하면 무엇이 번지고 있는지 읽히지 않습니다. 화면 가로폭 기준으로 인물은
 * 대략 27~86% 를 차지하므로 또렷한 영역의 가로 반지름은 56%에서 ±29% 이상
 * 이어야 합니다(42 × 0.70 = 29.4). 이 값들을 줄이면 어깨가 바탕색에 묻힙니다.
 *
 * 끝값은 타원을 화면 밖까지 키우고 core 를 100 으로 올려 마스크 자체가
 * 사라진 것과 같은 상태로 만듭니다.
 */
const CENTER = "56% 48%";
const FROM = { rx: 42, ry: 58, core: 70, outer: 0.05 };
const TO = { rx: 175, ry: 175, core: 100, outer: 1 };

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* 시작과 끝을 부드럽게. 가운데 구간에서 가장 빠르게 번집니다. */
const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

const maskAt = (p: number) =>
  `radial-gradient(ellipse ${lerp(FROM.rx, TO.rx, p)}% ${lerp(FROM.ry, TO.ry, p)}%` +
  ` at ${CENTER},` +
  ` rgb(0 0 0) ${lerp(FROM.core, TO.core, p)}%,` +
  ` rgb(0 0 0 / ${lerp(FROM.outer, TO.outer, p)}) 100%)`;

export default function HeroReveal() {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      const video = videoRef.current;

      if (query.matches) {
        // 마스크는 globals.css 가 꺼 주므로 값만 끝으로 맞추고 영상은 세웁니다.
        setProgress(1);
        video?.pause();
        if (video) video.currentTime = 0;
        return;
      }

      void video?.play().catch(() => {});

      /*
       * 기준 시각은 마운트 시점이 아니라 **첫 프레임이 그려진 시점**입니다.
       * 백그라운드 탭에서는 rAF 가 멈추므로, 마운트 시각을 기준으로 잡으면
       * 탭으로 돌아왔을 때 이미 시간이 다 지나 연출이 통째로 생략됩니다.
       */
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now + HOLD_MS;
        const t = clamp01((now - start) / REVEAL_MS);
        setProgress(ease(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    run();
    query.addEventListener("change", run);
    return () => {
      cancelAnimationFrame(raf);
      query.removeEventListener("change", run);
    };
  }, []);

  const p = progress;
  const mask = maskAt(p);

  return (
    <section
      aria-label="탑치과 소개"
      className="relative flex min-h-svh items-end overflow-hidden bg-page"
    >
      {/* 번져 나가는 배경 영상. overflow-hidden 이 워터마크가 있는 윗부분을 잘라 냅니다. */}
      <div
        aria-hidden
        className="hero-reveal absolute inset-0 overflow-hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          poster="/photos/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          tabIndex={-1}
          className="absolute left-0 w-full object-cover"
          style={{
            height: `${VIDEO_H.toFixed(2)}%`,
            top: `${(100 - VIDEO_H).toFixed(2)}%`,
            objectPosition: "55% 50%",
          }}
        />
      </div>

      {/*
        글자가 얹히는 아래쪽만 바탕색으로 덮습니다. 위쪽은 건드리지 않아야
        영상이 탁해지지 않습니다. 번지기 전에는 아래쪽도 어차피 바탕색이라
        이 층이 보이지 않고, 다 번진 뒤에만 영상 위에 드러납니다.
      */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top," +
            " var(--color-page) 0%," +
            " var(--color-page) 24%," +
            " color-mix(in srgb, var(--color-page) 82%, transparent) 46%," +
            " transparent 76%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-24">
        <p className="text-sm text-muted">경기 광주 이배재로 · 임플란트 · 치아교정</p>
        <h1 className="display mt-4 max-w-xl text-[clamp(1.65rem,4.6vw,3rem)]">
          진단이 정확할수록
          <br />
          치료는 단순해집니다
        </h1>
        <p className="prose-ko mt-6 max-w-xl text-muted">
          파노라마 사진만으로는 잇몸뼈의 두께도, 신경관의 위치도 알 수 없습니다.
          탑치과는 3차원&nbsp;CT로 확인한 뒤 계획을 세웁니다. 서울대학교 치의학 박사
          유서우 대표원장이 진단부터 사후 관리까지 맡습니다.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* 바탕색 그라데이션 위에 얹히므로 헤더의 예약 버튼과 같은 색을 씁니다. */}
          <a
            href={`tel:${clinic.phone}`}
            className="flex min-h-13 items-center bg-blue px-7 text-sm font-medium text-page transition-colors hover:bg-blue-deep"
          >
            전화로 예약하기 {clinic.phone}
          </a>
          <Link
            href="/#visit"
            className="flex min-h-11 items-center border-b border-rule text-sm text-muted transition-colors hover:border-ink hover:text-ink"
          >
            진료시간 보기
          </Link>
        </div>
      </div>

    </section>
  );
}
