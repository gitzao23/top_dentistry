import Measure from "@/components/Measure";
import NaverMap from "@/components/NaverMap";
import CardRail from "@/components/CardRail";
import HeroReveal from "@/components/HeroReveal";
import Placeholder from "@/components/Placeholder";
import {
  clinic,
  doctor,
  faqs,
  hours,
  implants,
  orthodontics,
  principles,
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

      {/* 진료 원칙 — 여섯 가지를 한눈에 펼쳐 둡니다. */}
      <section id="principles" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <h2 className="heading text-center text-2xl sm:text-3xl">진료 원칙</h2>
        <p className="prose-ko mx-auto mt-4 max-w-xl text-center text-sm text-muted">
          빼도 되는 치아를 남기는 일부터 치료가 끝난 뒤의 관리까지, 판단이 갈리는
          자리마다 무엇을 기준으로 삼는지 적었습니다.
        </p>

        {/* auto-rows-fr 이 두 줄의 높이를 같게 맞춰 여섯 장이 모두 같은 크기가 됩니다. */}
        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <article
              key={p.title}
              className="rounded-3xl bg-page p-7 shadow-[12px_12px_24px_-10px_rgba(22,32,43,0.28)]"
            >
              <p className="text-xs tracking-[0.14em] text-faint">
                원칙 {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="heading mt-3 text-[1.0625rem]">{p.title}</h3>
              <p className="prose-ko mt-3 text-sm text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/*
        카드로 넘겨 보는 세 덩이 — 임플란트 · 치아교정 · 병원 둘러보기.
        왼쪽 이름을 누르면 오른쪽 카드가 그 항목으로 넘어갑니다.
        화살표로도 그대로 넘길 수 있고, 두 쪽이 같은 번호를 봅니다.
      */}
      <CardRail
        title="임플란트"
        lead="임플란트는 심는 것보다 심을 자리를 만드는 일이 어렵습니다. 뼈가 부족한지, 얼마나 오래 비어 있었는지, 상악동과 신경관이 어디에 있는지에 따라 방법이 달라집니다."
        items={implants}
        label="임플란트 방법"
      />

      <CardRail
        title="치아교정"
        lead="장치가 보이는 것이 부담스러운지, 빼고 끼울 수 있어야 하는지에 따라 선택이 갈립니다. 치아 상태와 생활을 함께 보고 고릅니다."
        items={orthodontics.map((o) => ({
          title: o.title,
          // 한 줄 요약은 카드에서 제목 옆에 붙습니다.
          lead: o.summary,
          points: o.points,
          image: o.image,
        }))}
        label="교정 장치"
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
              <Credentials heading="학력" items={[...doctor.education]} />
              <Credentials heading="경력" items={[...doctor.career]} />
              <div className="sm:col-span-2">
                <Credentials
                  heading="학회 · 연구회"
                  items={[...doctor.societies]}
                  columns
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 — 질문마다 +/- 로 열고 닫습니다. */}
      <section id="faq" className="border-t border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">자주 묻는 질문</h2>
            <p className="prose-ko mt-5 text-sm text-muted">
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
 * 질문 하나. `<details>` 를 그대로 씁니다.
 * 직접 만들면 열고 닫는 상태, 키보드, 보조기기 알림을 전부 손으로 붙여야 하는데
 * 브라우저가 이미 다 해 줍니다. +/- 표시는 `group-open` 으로 바꿉니다.
 */
function Faq({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-rule">
      <summary className="flex cursor-pointer list-none items-start gap-4 py-5 marker:content-none">
        <span
          aria-hidden
          className="relative mt-1.5 block size-4 shrink-0 text-blue"
        >
          {/* 가로선은 늘 있고, 세로선만 열릴 때 사라집니다. */}
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
        </span>
        <span className="text-[1.0625rem] font-medium">{question}</span>
      </summary>
      <p className="prose-ko pb-6 pl-8 text-sm text-muted">{answer}</p>
    </details>
  );
}

function Credentials({
  heading,
  items,
  columns = false,
}: {
  heading: string;
  items: string[];
  columns?: boolean;
}) {
  return (
    <div className="border-t border-rule py-4">
      <h3 className="text-sm text-muted">{heading}</h3>
      <ul
        className={`mt-2 space-y-1 text-base ${columns ? "sm:columns-2 sm:gap-12" : ""}`}
      >
        {items.map((item) => (
          <li key={item} className="break-inside-avoid">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
