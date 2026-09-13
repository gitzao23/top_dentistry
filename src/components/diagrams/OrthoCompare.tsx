/**
 * 교정 장치 비교 도해 — 직접 그린 원본입니다.
 * 자가결찰 브라켓은 치아 앞면에 붙어 철사로 힘을 주고, 투명 교정은 치아 전체를
 * 덮는 껍질이라는 구조 차이만 남기고 나머지 묘사는 뺐습니다.
 */

function Tooth({ x }: { x: number }) {
  return (
    <path
      d={`M${x} 76 q22 0 22 22 v28 q0 18 -11 18 h-22 q-11 0 -11 -18 V98 q0 -22 22 -22 Z`}
      fill="var(--color-page)"
      stroke="var(--color-rule)"
      strokeWidth="2"
    />
  );
}

export default function OrthoCompare({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 300 200"
        role="img"
        aria-labelledby="ortho-compare-title ortho-compare-desc"
        className="w-full"
      >
        <title id="ortho-compare-title">
          자가결찰 브라켓과 투명 교정의 구조 차이
        </title>
        <desc id="ortho-compare-desc">
          자가결찰 브라켓은 치아 앞면에 붙인 장치를 철사가 가로지르며 계속 힘을
          줍니다. 투명 교정은 치아 전체를 덮는 얇은 껍질을 끼웠다 뺍니다.
        </desc>

        {/* 왼쪽 — 자가결찰 브라켓 */}
        <Tooth x={62} />
        <Tooth x={112} />
        <path
          d="M34 110 H140"
          stroke="var(--color-blue-deep)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {[62, 112].map((x) => (
          <g key={x}>
            <rect
              x={x - 13}
              y={100}
              width="26"
              height="20"
              rx="4"
              fill="var(--color-blue)"
            />
            <rect
              x={x - 8}
              y={107}
              width="16"
              height="6"
              rx="3"
              fill="var(--color-page)"
              opacity="0.75"
            />
          </g>
        ))}

        {/* 가운데 구분선 */}
        <line
          x1="150"
          y1="46"
          x2="150"
          y2="164"
          stroke="var(--color-rule)"
          strokeWidth="1"
        />

        {/* 오른쪽 — 투명 교정 */}
        <Tooth x={196} />
        <Tooth x={246} />
        <rect
          x="168"
          y="66"
          width="110"
          height="92"
          rx="14"
          fill="var(--color-blue)"
          fillOpacity="0.14"
          stroke="var(--color-blue)"
          strokeWidth="2"
        />

        <g
          fill="var(--color-ink)"
          fontSize="11.5"
          fontWeight="700"
          fontFamily="inherit"
          textAnchor="middle"
        >
          <text x="87" y="188">자가결찰 브라켓</text>
          <text x="223" y="188">투명 교정</text>
        </g>
        <g
          fill="var(--color-faint)"
          fontSize="9.5"
          fontFamily="inherit"
          textAnchor="middle"
        >
          <text x="87" y="34">고무링 없이 뚜껑으로 고정</text>
          <text x="223" y="34">치아 전체를 덮고 탈착</text>
        </g>
      </svg>
    </figure>
  );
}
