import { clinic, doctor, faqs, hours } from "@/content/clinic";

/**
 * 검색엔진이 병원 정보를 구조화해서 읽도록 하는 표시입니다.
 * 지역 검색 결과에 진료시간·전화·주소가 그대로 노출되는 근거가 됩니다.
 */
const DAY_NAME: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export default function ClinicJsonLd() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.nameKo,
    alternateName: clinic.nameEn,
    url: clinic.siteUrl,
    telephone: clinic.phone,
    description: `3차원 CT 진단을 바탕으로 임플란트와 치아교정을 진료하는 ${clinic.addressLocality} 치과입니다.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.streetAddress,
      addressLocality: clinic.addressLocality,
      addressRegion: clinic.addressRegion,
      addressCountry: "KR",
    },
    medicalSpecialty: "Dentistry",
    availableService: [
      { "@type": "MedicalProcedure", name: "치과 임플란트" },
      { "@type": "MedicalProcedure", name: "상악동 거상술" },
      { "@type": "MedicalProcedure", name: "뼈이식 임플란트" },
      { "@type": "MedicalProcedure", name: "치아교정" },
      { "@type": "MedicalProcedure", name: "투명교정" },
    ],
    employee: {
      "@type": "Person",
      name: doctor.name,
      jobTitle: doctor.role,
      alumniOf: { "@type": "CollegeOrUniversity", name: "서울대학교" },
    },
    openingHoursSpecification: hours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAME[h.short],
        opens: h.open,
        closes: h.close,
      })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentist) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
