"use client";

import { useEffect, useRef, useState } from "react";
import { clinic } from "@/content/clinic";

/**
 * 오시는 길 지도.
 *
 * `map.naver.com` 은 `X-Frame-Options` 로 iframe 을 막아 두어서 주소만 넣어
 * 퍼오는 방법이 없습니다. 화면 안에 지도를 띄우려면 **네이버 지도 JavaScript
 * API v3** 를 쓰는 수밖에 없고, 그러려면 네이버 클라우드 플랫폼에서 받은
 * Client ID 가 필요합니다.
 *
 *   1. https://console.ncloud.com → Services → AI·NAVER API → Application 등록
 *   2. Maps 의 **Web Dynamic Map** 과 **Geocoding** 을 켭니다
 *   3. 서비스 URL 에 배포 도메인과 `http://localhost:3000` 을 모두 등록합니다
 *   4. 발급된 Client ID 를 `.env.local` 에 적습니다
 *      NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=발급받은값
 *
 * 좌표는 박아 넣지 않고 **Geocoding 으로 주소에서 찾습니다.** 병원 좌표를
 * 손으로 적어 두면 주소를 고칠 때 표식만 엉뚱한 자리에 남습니다.
 *
 * 키가 없거나 지도를 불러오지 못하면 네이버 지도로 넘겨 주는 링크로 물러섭니다.
 * 지도가 안 뜬다고 오시는 길이 통째로 비어 버리면 안 됩니다.
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

/* 실제로 쓰는 부분만 좁게 선언합니다. 전체 타입 패키지를 받을 만큼 쓰지 않습니다. */
type LatLng = object;
type NaverMaps = {
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (el: HTMLElement, options: { center: LatLng; zoom: number }) => object;
  Marker: new (options: { position: LatLng; map: object; title: string }) => object;
  Service: {
    Status: { OK: string };
    geocode: (
      options: { query: string },
      callback: (
        status: string,
        response: { v2?: { addresses?: { x: string; y: string }[] } },
      ) => void,
    ) => void;
  };
};

declare global {
  interface Window {
    naver?: { maps?: NaverMaps };
  }
}

const SRC =
  `https://oapi.map.naver.com/openapi/v3/maps.js` +
  `?ncpKeyId=${CLIENT_ID}&submodules=geocoder`;

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.naver?.maps) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-naver-map]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("load failed")));
      return;
    }

    const el = document.createElement("script");
    el.src = SRC;
    el.async = true;
    el.dataset.naverMap = "true";
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("load failed"));
    document.head.appendChild(el);
  });
}

export default function NaverMap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(!CLIENT_ID);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        const maps = window.naver?.maps;
        const box = boxRef.current;
        if (cancelled || !maps || !box) return;

        maps.Service.geocode({ query: clinic.address }, (status, response) => {
          if (cancelled) return;
          const found = response?.v2?.addresses?.[0];
          if (status !== maps.Service.Status.OK || !found) {
            setFailed(true);
            return;
          }
          const position = new maps.LatLng(Number(found.y), Number(found.x));
          const map = new maps.Map(box, { center: position, zoom: 17 });
          new maps.Marker({ position, map, title: clinic.nameKo });
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return <MapLink />;

  return (
    <div
      ref={boxRef}
      aria-label={`${clinic.nameKo} 위치 지도`}
      className="mt-6 h-72 w-full overflow-hidden rounded-2xl border border-rule bg-surface"
    />
  );
}

/** 지도를 못 띄웠을 때 — 네이버 지도의 병원 자리로 넘겨 줍니다. */
function MapLink() {
  return (
    <a
      href={clinic.mapUrl}
      target="_blank"
      rel="noreferrer"
      className="mt-6 flex items-center gap-4 rounded-2xl border border-rule bg-page p-5 transition-colors hover:border-blue"
    >
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">
          네이버 지도에서 {clinic.nameKo} 위치 보기
        </span>
        <span className="mt-1 block text-sm text-muted">
          {clinic.addressShort}
        </span>
      </span>
      <span aria-hidden className="ml-auto shrink-0 text-faint">
        ↗
      </span>
    </a>
  );
}
