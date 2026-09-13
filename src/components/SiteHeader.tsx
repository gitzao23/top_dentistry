"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { clinic, nav } from "@/content/clinic";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  /*
   * 헤더 바탕은 순백입니다. 로고 두 개가 흰 배경을 가진 그림이라, 바탕에 한 톨
   * 이라도 회색기가 돌면(page 는 #FCFCFD) 로고 자리만 밝은 사각형으로 떠 보입니다.
   * 불투명이므로 backdrop-blur 는 필요 없습니다.
   */
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-6 px-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-2.5"
          >
            {/* 로고는 글자와 함께 이름을 이루므로 alt 를 비워 중복 낭독을 막습니다. */}
            <Image
              src="/logo/top-dental.jpg"
              alt=""
              width={1024}
              height={1024}
              priority
              className="h-11 w-11 object-contain"
            />
            <span className="flex flex-col justify-center leading-none">
              <span className="heading text-xl tracking-[0.18em]">탑치과</span>
              <span className="mt-1.5 text-[10px] tracking-[0.18em] text-faint">
                {clinic.nameEn}
              </span>
            </span>
          </Link>

          {/*
            대표원장의 출신 학교 표식입니다. 링크가 아니라 표식이므로 클릭 대상이
            아니고, 세로 괘선으로 병원 이름과 구분해 둡니다.
          */}
          <span className="flex items-center gap-3 border-l border-rule pl-3">
            <Image
              src="/logo/snu.png"
              alt="서울대학교"
              width={376}
              height={376}
              className="h-11 w-11 object-contain"
            />
          </span>
        </div>

        <nav aria-label="주요 메뉴" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-3 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`tel:${clinic.phone}`}
          className="ml-auto hidden min-h-11 items-center bg-blue px-5 text-sm font-medium text-page transition-colors hover:bg-blue-deep lg:ml-4 lg:flex"
        >
          진료 예약 {clinic.phone}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto flex min-h-11 items-center px-2 text-sm text-muted lg:hidden"
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="주요 메뉴"
          className="border-t border-rule lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-6 py-1">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
