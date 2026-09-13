import Link from "next/link";
import { clinic, nav } from "@/content/clinic";

export const metadata = { title: "페이지를 찾을 수 없습니다" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:py-40">
      <p className="text-sm text-muted">404</p>
      <h1 className="display mt-6 text-[clamp(1.7rem,5vw,3rem)]">
        찾으시는 페이지가 없습니다
      </h1>
      <p className="prose-ko mt-8 max-w-md text-muted">
        주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하시는 항목을 골라
        주세요. 급하시면 바로 전화 주셔도 됩니다.
      </p>

      <ul className="mt-12 max-w-md border-b border-rule">
        {nav.map((item) => (
          <li key={item.href} className="border-t border-rule">
            <Link
              href={item.href}
              className="flex min-h-14 items-center justify-between text-sm transition-colors hover:text-blue"
            >
              {item.label}
              <span aria-hidden className="text-faint">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <a
        href={`tel:${clinic.phone}`}
        className="mt-12 inline-flex min-h-13 items-center bg-blue px-7 text-sm font-medium text-page transition-colors hover:bg-blue-deep"
      >
        전화로 문의하기 {clinic.phone}
      </a>
    </section>
  );
}
