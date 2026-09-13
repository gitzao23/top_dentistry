import Link from "next/link";
import { clinic } from "@/content/clinic";

/**
 * 모바일에서 가장 많이 쓰이는 동작이 전화 걸기라, 화면 아래에 항상 띄워 둡니다.
 * 데스크톱에서는 헤더의 예약 버튼이 같은 역할을 하므로 숨깁니다.
 */
export default function MobileCallBar() {
  return (
    // fixed 여야 합니다. sticky 로 두면 히어로가 스크롤을 잠근 동안
    // 화면에서 사라져, 정작 필요한 순간에 전화 버튼이 없습니다.
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-page/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-stretch gap-px p-3">
        <a
          href={`tel:${clinic.phone}`}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-blue px-4 text-sm font-medium text-page"
        >
          전화 {clinic.phone}
        </a>
        <Link
          href="/#visit"
          className="flex min-h-12 items-center justify-center border border-rule px-5 text-sm"
        >
          오시는 길
        </Link>
      </div>
    </div>
  );
}
