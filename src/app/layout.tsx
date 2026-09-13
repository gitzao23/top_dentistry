import type { Metadata } from "next";
import "./globals.css";
import { clinic } from "@/content/clinic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileCallBar from "@/components/MobileCallBar";
import ClinicJsonLd from "@/components/ClinicJsonLd";

// 서체(Pretendard Variable)는 globals.css 에서 npm 패키지를 직접 불러옵니다.

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: `${clinic.nameKo} · 경기 광주 임플란트 · 치아교정`,
    template: `%s · ${clinic.nameKo}`,
  },
  description: `경기도 광주시 이배재로 ${clinic.nameKo}. 3차원 CT 진단을 바탕으로 임플란트와 치아교정을 진료합니다. 서울대학교 치의학 박사 ${clinic.doctorName} 대표원장. 전화 ${clinic.phone}`,
  keywords: [
    "경기광주 치과",
    "광주시 임플란트",
    "이배재로 치과",
    "치아교정",
    "투명교정",
    "상악동거상술",
    "뼈이식 임플란트",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: clinic.nameKo,
    title: `${clinic.nameKo} · 경기 광주 임플란트 · 치아교정`,
    description: `3차원 CT 진단을 바탕으로 임플란트와 치아교정을 진료합니다. ${clinic.address}`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      {/* pb-20 은 모바일 하단 고정 전화바에 푸터가 가리지 않도록 둔 자리입니다. */}
      <body className="min-h-full flex flex-col bg-page text-ink pb-20 lg:pb-0">
        <ClinicJsonLd />
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
