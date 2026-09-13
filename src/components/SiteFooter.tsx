import { clinic } from "@/content/clinic";

/**
 * 푸터는 이름과 전화번호만 둡니다.
 * 진료시간과 오시는 길은 바로 위 "진료시간 · 오시는 길" 섹션에 이미 있어서,
 * 푸터에 한 번 더 적으면 같은 내용을 두 군데서 고쳐야 합니다.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-6 py-12">
        <div>
          <p className="heading text-lg tracking-[0.18em]">탑치과</p>
          <p className="mt-2 text-[10px] tracking-[0.18em] text-faint">
            {clinic.nameEn}
          </p>
          <p className="prose-ko mt-4 text-sm text-muted">{clinic.motto}</p>
        </div>

        <div className="text-sm">
          <p className="text-muted">예약 · 문의</p>
          <a
            href={`tel:${clinic.phone}`}
            className="flex min-h-11 items-center text-2xl font-medium text-blue"
          >
            {clinic.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-faint">
          © {new Date().getFullYear()} {clinic.nameKo} {clinic.nameEn} · 이 사이트의
          의료 정보는 일반적인 안내이며, 실제 진단과 치료 방법은 검사 결과에 따라
          달라집니다.
        </p>
      </div>
    </footer>
  );
}
