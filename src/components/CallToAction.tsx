import Link from "next/link";
import { clinic } from "@/content/clinic";

export default function CallToAction({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="bg-blue text-page">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <h2 className="heading max-w-lg text-2xl sm:text-3xl">{heading}</h2>
        <p className="prose-ko mt-6 max-w-xl text-sm text-page/70">{body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={`tel:${clinic.phone}`}
            className="flex min-h-13 items-center bg-page px-7 text-sm font-medium text-blue transition-colors hover:bg-blue-tint"
          >
            전화로 예약하기 {clinic.phone}
          </a>
          <Link
            href="/#visit"
            className="border-b border-page/40 pb-1 text-sm transition-colors hover:border-page"
          >
            진료시간 · 오시는 길
          </Link>
        </div>
      </div>
    </section>
  );
}
