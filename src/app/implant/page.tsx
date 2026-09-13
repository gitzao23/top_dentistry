import type { Metadata } from "next";
import Measure from "@/components/Measure";
import CallToAction from "@/components/CallToAction";
import ImplantAnatomy from "@/components/diagrams/ImplantAnatomy";
import { implantProcess, implants } from "@/content/clinic";

export const metadata: Metadata = {
  title: "임플란트",
  description:
    "상악동 거상술, 뼈이식 임플란트, 발치 즉시 임플란트, 임플란트 재수술, 임플란트 틀니. 3차원 CT 진단으로 잇몸뼈와 신경관을 확인한 뒤 계획합니다.",
};

export default function ImplantPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-12 sm:pt-16 sm:pb-16">
        <p className="text-sm text-muted">진료 안내</p>
        <h1 className="display mt-6 text-[clamp(1.9rem,6vw,3.75rem)]">임플란트</h1>
        <p className="prose-ko mt-9 max-w-xl text-muted">
          임플란트는 턱뼈에 인공치근을 심고, 그 뿌리와 뼈가 직접 붙기를 기다린 뒤
          보철을 얹는 치료입니다. 성패를 가르는 것은 심는 기술보다 심을 자리의
          상태이고, 그 자리는 3차원 CT를 찍기 전까지 정확히 알 수 없습니다.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <Measure />
      </div>

      {/* 구조도 */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_26rem] lg:gap-20">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">무엇을 심는 것인가</h2>
            <p className="prose-ko mt-6 max-w-lg text-muted">
              임플란트를 &ldquo;이를 심는다&rdquo;고 표현하지만, 실제로 심는 것은
              치아가 아니라 <strong className="font-bold">치아뿌리 역할을 하는
              나사</strong>입니다. 뿌리가 뼈에 자리를 잡은 뒤에야 그 위에 보이는
              치아를 얹습니다.
            </p>
            <p className="prose-ko mt-5 max-w-lg text-sm text-muted">
              그래서 &ldquo;임플란트를 잘한다&rdquo;는 말은 보철을 예쁘게 만든다는
              뜻이 아니라, 뿌리가 들어갈 뼈를 정확히 읽고 필요하면 만들어 낼 수
              있다는 뜻에 가깝습니다.
            </p>
          </div>
          <ImplantAnatomy />
        </div>
      </section>

      {/* 치료 과정 — 실제로 순서가 있는 내용이라 번호를 붙였습니다. */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <h2 className="heading text-2xl sm:text-3xl">치료 과정</h2>
        <p className="prose-ko mt-5 max-w-xl text-sm text-muted">
          뼈이식이 필요 없는 경우를 기준으로 한 일반적인 흐름입니다. 실제 기간은 뼈
          상태와 전신질환에 따라 달라집니다.
        </p>

        <ol className="mt-9">
          {implantProcess.map((s, i) => (
            <li
              key={s.step}
              className="grid gap-3 border-t border-rule py-8 lg:grid-cols-[3rem_15rem_1fr] lg:gap-8"
            >
              <span
                aria-hidden
                className="text-sm tabular-nums text-blue lg:pt-0.5"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.0625rem] font-bold">{s.step}</h3>
                <p className="mt-1.5 text-xs text-faint">{s.duration}</p>
              </div>
              <p className="prose-ko max-w-2xl text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      {/* 다섯 가지 방법 */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <h2 className="heading text-2xl sm:text-3xl">상태에 따른 다섯 가지 방법</h2>
          <dl className="mt-9">
            {implants.map((item) => (
              <div
                key={item.title}
                className="grid gap-4 border-t border-rule py-10 lg:grid-cols-[19rem_1fr] lg:gap-16"
              >
                <dt>
                  <span className="heading block text-xl sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm text-blue">{item.lead}</span>
                </dt>
                <dd className="prose-ko max-w-2xl text-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CallToAction
        heading="어느 방법이 맞는지는 찍어 봐야 압니다"
        body="잇몸뼈가 얼마나 남았는지는 겉으로 보이지 않습니다. 3차원 CT로 확인하고, 자연치아를 살릴 수 있는 경우라면 그 방법부터 말씀드립니다. 당뇨나 골다공증 약을 드시는 분은 복용 중인 약 목록을 가져오세요."
      />
    </>
  );
}
