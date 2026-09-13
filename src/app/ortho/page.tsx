import type { Metadata } from "next";
import Measure from "@/components/Measure";
import CallToAction from "@/components/CallToAction";
import OrthoCompare from "@/components/diagrams/OrthoCompare";
import { orthoNote, orthodontics } from "@/content/clinic";

export const metadata: Metadata = {
  title: "치아교정",
  description:
    "클리피씨 자가결찰 교정과 투명 교정. 장치의 차이, 하루 착용 시간, 교정이 끝난 뒤의 유지장치까지 설명합니다.",
};

export default function OrthoPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-12 sm:pt-16 sm:pb-16">
        <p className="text-sm text-muted">진료 안내</p>
        <h1 className="display mt-6 text-[clamp(1.9rem,6vw,3.75rem)]">치아교정</h1>
        <p className="prose-ko mt-9 max-w-xl text-muted">
          교정은 뼈가 다시 만들어지는 속도에 맞춰 치아를 조금씩 옮기는 치료입니다.
          그래서 몇 년이 걸리고, 치아 상태만큼이나 생활이 중요합니다. 사람을 자주
          만나는지, 장치를 스스로 챙길 수 있는지를 함께 보고 고릅니다.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <Measure />
      </div>

      {/* 두 장치의 구조 차이 */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-20">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">두 장치는 무엇이 다른가</h2>
            <p className="prose-ko mt-6 max-w-lg text-muted">
              자가결찰 브라켓은 치아 앞면에 붙인 장치를 철사가 지나가며 계속
              힘을 줍니다. 24시간 작동하지만 뺄 수 없습니다. 투명 교정은 치아
              전체를 덮는 얇은 장치를 단계별로 바꿔 끼웁니다. 뺄 수 있는 대신,
              빼놓은 시간만큼 치료가 멈춥니다.
            </p>
            <p className="prose-ko mt-5 max-w-lg text-sm text-muted">
              어느 쪽이 더 좋은 장치인지를 묻기보다, 스스로 장치를 챙길 수 있는
              생활인지를 먼저 보는 편이 정확합니다.
            </p>
          </div>
          <OrthoCompare />
        </div>
      </section>

      <section className="border-t border-rule mx-auto max-w-6xl px-6 py-14 sm:py-20">
        {orthodontics.map((item) => (
          <article
            key={item.title}
            className="grid gap-6 border-b border-rule py-12 first:pt-0 last:border-b-0 lg:grid-cols-[19rem_1fr] lg:gap-16"
          >
            <div>
              <h2 className="heading text-xl sm:text-2xl">{item.title}</h2>
              <p className="prose-ko mt-4 text-sm text-muted">{item.summary}</p>
            </div>
            <ul className="max-w-2xl">
              {item.points.map((pt) => (
                <li
                  key={pt}
                  className="prose-ko flex gap-4 border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <span aria-hidden className="text-blue">
                    ·
                  </span>
                  <span className="text-muted">{pt}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* 유지 단계 — 교정에서 가장 자주 생략되고 가장 자주 후회하는 부분입니다. */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-16">
            <h2 className="heading text-xl sm:text-2xl">{orthoNote.title}</h2>
            <p className="prose-ko max-w-2xl text-muted">{orthoNote.body}</p>
          </div>
        </div>
      </section>

      <CallToAction
        heading="장치를 고르기 전에 상담을 먼저 합니다"
        body="치아 배열과 씹히는 상태, 잇몸 건강을 먼저 확인하고 예상 기간과 관리 방법을 설명드린 다음 장치를 정합니다. 궁금한 점은 전화로 먼저 물어보셔도 됩니다."
      />
    </>
  );
}
