import Image from "next/image";
import Measure from "@/components/Measure";
import NaverMap from "@/components/NaverMap";
import CardRail from "@/components/CardRail";
import PrincipleRail from "@/components/PrincipleRail";
import HeroReveal from "@/components/HeroReveal";
import Placeholder from "@/components/Placeholder";
import ImplantAnatomy from "@/components/diagrams/ImplantAnatomy";
import OrthoCompare from "@/components/diagrams/OrthoCompare";
import type { CarouselCard } from "@/components/CardCarousel";
import {
  clinic,
  doctor,
  faqs,
  hours,
  implantIntro,
  implantMethods,
  implantProcess,
  implants,
  orthoCautions,
  orthoIntro,
  orthodontics,
  tour,
  transit,
} from "@/content/clinic";

export default function Home() {
  return (
    <>
      {/* 히어로 — 배경 영상이 가운데에서 바깥으로 번집니다. */}
      <HeroReveal />

      <div className="mx-auto max-w-6xl px-6 pt-6">
        <Measure />
      </div>

      {/*
        진료 원칙 — 넓은 화면은 여섯 장을 한눈에 펼치고, 폰 화면에서는
        임플란트·치아교정처럼 옆으로 넘겨 봅니다(PrincipleRail).
      */}
      <section id="principles" className="mx-auto max-w-6xl px-6 py-10 sm:py-20">
        <h2 className="heading text-center text-2xl sm:text-3xl">진료 원칙</h2>
        <PrincipleRail />
      </section>

      {/*
        카드로 넘겨 보는 세 덩이 — 임플란트 · 치아교정 · 병원 둘러보기.
        왼쪽 이름을 누르면 오른쪽 카드가 그 항목으로 넘어갑니다.
        화살표로도 그대로 넘길 수 있고, 두 쪽이 같은 번호를 봅니다.
      */}
      <CardRail
        id="implant"
        title="임플란트"
        lead="임플란트는 심는 것보다 심을 자리를 만드는 일이 어렵습니다. 뼈가 부족한지, 얼마나 오래 비어 있었는지, 상악동과 신경관이 어디에 있는지에 따라 방법이 달라집니다."
        items={implantCards}
        label="임플란트 안내"
      />

      <CardRail
        id="ortho"
        title="치아교정"
        lead="장치가 보이는 것이 부담스러운지, 빼고 끼울 수 있어야 하는지에 따라 선택이 갈립니다. 치아 상태와 생활을 함께 보고 고릅니다."
        items={orthoCards}
        label="치아교정 안내"
      />

      <CardRail
        title="병원 둘러보기"
        lead="접수처에서 대기 공간, 상담실과 진료실까지 실제 모습입니다. 치료 전에 무엇을 어떻게 할지 먼저 설명드리는 자리를 따로 두었습니다."
        items={tour.map((photo) => ({
          title: photo.caption,
          image: { src: photo.src, alt: photo.alt },
        }))}
        label="병원 내부 사진"
      />

      {/* 의료진 */}
      {/* 한 화면에 다 들어오도록 다른 섹션보다 위아래를 더 조였습니다. */}
      <section id="doctor" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
          {/* 제목과 표어를 한 줄에 붙여 둡니다. 좁으면 표어가 아래로 접힙니다. */}
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="heading text-2xl sm:text-3xl">의료진</h2>
            <p className="display text-xl sm:text-2xl">진단한 사람이 끝까지 봅니다</p>
          </div>
          <p className="prose-ko mt-4 max-w-2xl text-[0.9375rem] text-muted">
            진단과 수술, 보철과 사후 관리를 서로 다른 사람이 나눠 맡으면 판단의
            근거가 끊깁니다. 탑치과는 처음 진단한 의료진이 마지막 점검까지 봅니다.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-14">
            <div>
              <Placeholder label="대표원장 프로필 사진 · 세로 4:5" ratio="4 / 5" />
              {/* 직함과 이름을 한 줄에. 이름이 주인공이므로 크게 둡니다. */}
              <p className="mt-4 flex items-baseline gap-3">
                <span className="text-sm text-muted">{doctor.role}</span>
                <span className="heading text-2xl">{doctor.name}</span>
              </p>
            </div>

            <div className="grid gap-x-12 sm:grid-cols-2">
              <Credentials
                heading="학력"
                items={[...doctor.education]}
                badge={{ src: "/logo/snu-mark.png", width: 274, height: 284 }}
              />
              <Credentials heading="경력" items={[...doctor.career]} />
              <div className="sm:col-span-2">
                <Credentials
                  heading="학회 · 연구회"
                  items={[...doctor.societies]}
                  columns
                  badge={{ src: "/logo/aaid-mark.png", width: 350, height: 248 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 — 질문마다 +/- 로 열고 닫습니다. */}
      <section id="faq" className="border-t border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:gap-10 sm:py-20 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">자주 묻는 질문</h2>
            <p className="mt-3 text-sm leading-[1.7] text-muted sm:mt-5 sm:leading-[1.9]">
              진료 전에 가장 많이 받는 질문입니다. 여기에 없는 것은 전화로
              물어보셔도 됩니다.
            </p>
          </div>

          <div className="border-t border-rule">
            {faqs.map((f) => (
              <Faq key={f.q} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 진료시간 · 오시는길 */}
      <section id="visit" className="border-t border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">진료시간</h2>
            <dl className="mt-6">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-baseline justify-between gap-6 border-t border-rule py-2.5"
                >
                  <dt className={h.closed ? "text-faint" : ""}>{h.day}</dt>
                  <dd className="flex items-baseline gap-3">
                    {h.note && (
                      <span className="bg-blue-tint px-2 py-0.5 text-xs font-medium text-blue">
                        {h.note}
                      </span>
                    )}
                    <span
                      className={`tabular-nums ${
                        h.closed ? "text-faint" : "text-muted"
                      }`}
                    >
                      {h.closed ? "휴진" : `${h.open} – ${h.close}`}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="prose-ko mt-6 text-sm text-muted">
              목요일은 오후 2시 30분에 열어 저녁 8시 30분까지 진료합니다. 낮에 시간을
              내기 어려우면 목요일에 오세요.
            </p>
          </div>

          <div>
            <h2 className="heading text-2xl sm:text-3xl">오시는 길</h2>
            {/* 이름표와 내용을 한 줄에 나란히 둡니다. */}
            <dl className="mt-6">
              <div className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-rule py-3.5">
                <dt className="text-sm text-muted">주소</dt>
                <dd className="prose-ko">{clinic.address}</dd>
              </div>
              <div className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-rule py-3.5">
                <dt className="text-sm text-muted">버스</dt>
                <dd className="prose-ko">
                  {transit.buses.join(", ")}
                  <span className="text-muted">
                    {" "}
                    · {transit.stops.join(" 또는 ")} 하차
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-[3.5rem_1fr] items-center gap-4 border-t border-rule py-2">
                <dt className="text-sm text-muted">전화</dt>
                <dd>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="inline-flex min-h-11 items-center text-xl font-medium text-blue"
                  >
                    {clinic.phone}
                  </a>
                </dd>
              </div>
            </dl>


            <NaverMap />
          </div>
        </div>
      </section>
    </>
  );
}

/*
 * 임플란트 카드 목록 — 상위 세 장("무엇인가" · "어떻게 진행되는가" ·
 * "어느 쪽인가") 밑에 다섯 가지 방법이 하위 항목(`sub`)으로 붙습니다.
 * 상위 세 장은 사진 한 장으로 대신할 수 없어 `node` 로 짜임을 직접 넣습니다.
 */
const implantCards: readonly CarouselCard[] = [
  {
    title: "임플란트란",
    lead: implantIntro.lead,
    body: implantIntro.body,
    node: <ImplantAnatomy className="mx-auto w-full max-w-sm" />,
  },
  {
    title: "치료 과정",
    lead: "뼈이식이 필요 없는 경우 기준",
    node: <ImplantProcess />,
  },
  {
    title: "치료 방법",
    lead: implantMethods.lead,
    body: implantMethods.body,
    node: <ImplantMethods />,
  },
  ...implants.map((item) => ({ ...item, sub: true })),
];

/*
 * 다섯 가지를 이름과 "언제 쓰는가" 한 줄로만 훑어 줍니다. 자세한 내용은
 * 바로 뒤따르는 카드 다섯 장이 각각 맡으므로 여기서 되풀이하지 않습니다.
 */
function ImplantMethods() {
  return (
    <ul>
      {implants.map((m) => (
        <li
          key={m.title}
          className="grid gap-x-4 border-t border-rule py-1.5 first:border-t-0 first:pt-0 sm:py-2.5 sm:grid-cols-[11rem_1fr] sm:items-baseline"
        >
          <h4 className="text-[0.8125rem] font-bold sm:text-sm">{m.title}</h4>
          <p className="text-[0.8125rem] leading-[1.5] text-muted sm:mt-0 sm:text-sm sm:leading-[1.6]">
            {m.lead}
          </p>
        </li>
      ))}
    </ul>
  );
}

/*
 * 교정 카드 목록 — "교정 방식"이 맨 위, "주의사항"이 맨 아래이고 그 사이에
 * 장치 두 가지가 들어갑니다. 장치 둘은 `sub` 로 표시해, 왼쪽 목록에서
 * "교정 방식" 아래 한 단 들어간 하위 항목으로 보이게 했습니다.
 */
const orthoCards: readonly CarouselCard[] = [
  {
    title: "교정 방식",
    lead: orthoIntro.lead,
    body: orthoIntro.body,
    node: <OrthoCompare className="mx-auto w-full max-w-sm" />,
  },
  ...orthodontics.map((o) => ({
    title: o.title,
    // 한 줄 요약은 카드에서 제목 옆에 붙습니다.
    lead: o.summary,
    points: o.points,
    image: o.image,
    sub: true,
  })),
  {
    title: "주의사항",
    lead: orthoCautions.lead,
    points: orthoCautions.points,
    plain: true,
  },
];

/*
 * 다섯 단계를 카드 한 장 안에 세웁니다. 상세 설명 대신 한 줄 요약(`short`)만
 * 싣고 단계 사이 간격을 괘선 하나 두께까지 좁혀야 다섯 줄이 모두 들어옵니다.
 */
function ImplantProcess() {
  return (
    <ol>
      {implantProcess.map((s, i) => (
        <li
          key={s.step}
          className="grid grid-cols-[1.5rem_1fr] gap-x-2 border-t border-rule py-1.5 first:border-t-0 first:pt-0 sm:py-2.5 sm:grid-cols-[1.5rem_11rem_1fr] sm:gap-x-4 sm:items-baseline"
        >
          <span aria-hidden className="text-xs tabular-nums text-blue">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="sm:contents">
            <h4 className="text-[0.8125rem] font-bold sm:text-sm">
              {s.step}
              <span className="ml-2 text-xs font-normal text-faint sm:ml-0 sm:block sm:mt-0.5">
                {s.duration}
              </span>
            </h4>
            <p className="text-[0.8125rem] leading-[1.5] text-muted sm:mt-0 sm:text-sm sm:leading-[1.6]">
              {s.short}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/*
 * 질문 하나. `<details>` 를 그대로 씁니다.
 * 직접 만들면 열고 닫는 상태, 키보드, 보조기기 알림을 전부 손으로 붙여야 하는데
 * 브라우저가 이미 다 해 줍니다. +/- 표시는 `group-open` 으로 바꿉니다.
 */
function Faq({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-rule">
      <summary className="flex cursor-pointer list-none items-start gap-3 py-2.5 marker:content-none sm:gap-4 sm:py-5">
        <span
          aria-hidden
          className="relative mt-1 block size-4 shrink-0 text-blue sm:mt-1.5"
        >
          {/* 가로선은 늘 있고, 세로선만 열릴 때 사라집니다. */}
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
        </span>
        <span className="text-sm font-medium sm:text-[1.0625rem]">{question}</span>
      </summary>
      <p className="pb-4 pl-7 text-[0.8125rem] leading-[1.7] text-muted sm:pb-6 sm:pl-8 sm:text-sm sm:leading-[1.9]">
        {answer}
      </p>
    </details>
  );
}

/**
 * 약력 한 덩이. `badge` 를 넘기면 **왼쪽 칸의 오른쪽 끝**에 로고가 섭니다.
 *
 * 학력은 칸 하나를 통째로 쓰고, 학회 · 연구회는 여섯 줄을 두 칸으로 나눠
 * 그중 왼쪽 칸에 로고를 답니다. 바깥 약력 그리드와 학회 목록이 같은 폭
 * (`gap-x-12` 로 반씩)을 쓰므로, 두 로고의 좌우 자리가 저절로 맞습니다.
 *
 * 여섯 줄을 CSS 다단(`columns-2`)이 아니라 두 목록으로 나눈 이유도 이것입니다.
 * 다단은 칸의 경계가 요소가 아니라서 그 자리에 로고를 세울 수 없습니다.
 * 줄 수가 짝수든 홀수든 앞쪽 칸이 한 줄 더 가져가므로 보이는 결과는 같습니다.
 */
function Credentials({
  heading,
  items,
  columns = false,
  badge,
}: {
  heading: string;
  items: string[];
  columns?: boolean;
  badge?: Badge;
}) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="border-t border-rule py-4">
      <h3 className="text-sm text-muted">{heading}</h3>
      {columns ? (
        <div className="mt-2 grid gap-x-12 sm:grid-cols-2">
          <CredentialList items={items.slice(0, half)} badge={badge} />
          <CredentialList items={items.slice(half)} />
        </div>
      ) : (
        <CredentialList className="mt-2" items={items} badge={badge} />
      )}
    </div>
  );
}

type Badge = { src: string; width: number; height: number };

function CredentialList({
  items,
  badge,
  className = "",
}: {
  items: string[];
  badge?: Badge;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-6 ${className}`}>
      <ul className="min-w-0 flex-1 space-y-1 text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {/*
        로고 칸은 두 곳이 똑같습니다(112 × 80). 높이는 글 세 줄에 맞춘 값입니다
        — 24px 짜리 줄 셋에 줄 사이 4px 둘을 더해 80px.

        쓰는 그림은 원본이 아니라 **흰 여백을 잘라 낸 것**(`*-mark.png`)입니다.
        원본은 둘 다 표장 둘레에 흰 바탕을 넉넉히 두르고 있어(AAID 는 회색
        테두리까지), 같은 칸에 넣어도 실제로 보이는 표장 크기가 서로 달라집니다.
        여백을 걷어 내야 `object-contain` 으로 둘 다 80px 높이로 서서 크기가
        맞습니다. 헤더가 쓰는 `snu.png` 는 그대로 두었습니다.

        글이 바로 옆에서 학교와 학회 이름을 읽어 주므로 alt 는 비웁니다.
      */}
      {badge && (
        <Image
          src={badge.src}
          alt=""
          width={badge.width}
          height={badge.height}
          className="h-20 w-28 shrink-0 object-contain"
        />
      )}
    </div>
  );
}
