/**
 * 임플란트 구조도 — 직접 그린 원본 도해입니다(외부 이미지 사용 안 함).
 * 잇몸·치조골은 회색 계열로 두고 인공 구조물만 파란색으로 구분해,
 * "무엇이 원래 있던 것이고 무엇이 새로 들어가는 것인지"가 한눈에 보이게 했습니다.
 * 설명은 같은 카드의 글이 맡으므로 도해 자체에는 따로 붙이지 않습니다.
 */
export default function ImplantAnatomy({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 440 340"
        role="img"
        aria-labelledby="implant-anatomy-title implant-anatomy-desc"
        className="w-full"
      >
        <title id="implant-anatomy-title">임플란트 구조도</title>
        <desc id="implant-anatomy-desc">
          임플란트는 잇몸 위로 드러나는 보철(크라운), 보철과 인공치근을 잇는
          지대주(어버트먼트), 치조골 안에 심기는 인공치근(픽스처) 세 부분으로
          이루어집니다.
        </desc>

        <defs>
          {/* 치조골을 나타내는 사선 해칭 */}
          <pattern
            id="bone-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="var(--color-rule)"
              strokeWidth="1.6"
            />
          </pattern>
        </defs>

        {/* 치조골 */}
        <rect x="40" y="150" width="220" height="160" fill="var(--color-surface)" />
        <rect x="40" y="150" width="220" height="160" fill="url(#bone-hatch)" />

        {/* 잇몸 */}
        <path
          d="M40 150 H260 V126 q-22 -8 -44 0 t-44 0 t-44 0 t-44 0 t-44 0 Z"
          fill="var(--color-rule)"
        />

        {/* 인공치근(픽스처) — 나사선 */}
        <path
          d="M186 152 h44 v96 q0 14 -22 22 q-22 -8 -22 -22 Z"
          fill="var(--color-blue)"
        />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M188 ${164 + i * 12} h40`}
            stroke="var(--color-page)"
            strokeWidth="2.4"
            opacity="0.55"
          />
        ))}

        {/* 지대주(어버트먼트) */}
        <path d="M192 118 h32 l-6 34 h-20 Z" fill="var(--color-blue-deep)" />

        {/* 보철(크라운) */}
        <path
          d="M208 44 q34 0 34 30 v26 q0 18 -14 18 h-40 q-14 0 -14 -18 V74 q0 -30 34 -30 Z"
          fill="var(--color-page)"
          stroke="var(--color-blue)"
          strokeWidth="2.6"
        />

        {/* 지시선과 라벨 */}
        <g
          stroke="var(--color-faint)"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        >
          <path d="M242 74 H310" />
          <path d="M226 136 H310" />
          <path d="M232 206 H310" />
          <path d="M120 138 H96 V138" />
          <path d="M110 232 H96" />
        </g>

        <g
          fill="var(--color-ink)"
          fontSize="14"
          fontWeight="700"
          fontFamily="inherit"
        >
          <text x="318" y="70">보철</text>
          <text x="318" y="132">지대주</text>
          <text x="318" y="202">인공치근</text>
        </g>
        <g fill="var(--color-faint)" fontSize="11.5" fontFamily="inherit">
          <text x="318" y="87">크라운</text>
          <text x="318" y="149">어버트먼트</text>
          <text x="318" y="219">픽스처</text>
          <text x="90" y="142" textAnchor="end">
            잇몸
          </text>
          <text x="90" y="236" textAnchor="end">
            치조골
          </text>
        </g>
      </svg>
    </figure>
  );
}
