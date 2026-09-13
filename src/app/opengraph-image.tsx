import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${clinic.nameKo} · 경기 광주 임플란트 · 치아교정`;

const TITLE = "진단이 정확할수록\n치료는 단순해집니다";
const SUB = `${clinic.nameKo} · 경기 광주 이배재로 · 임플란트 · 치아교정`;

/**
 * 카카오톡·네이버·검색결과에 뜨는 공유 미리보기 이미지입니다.
 *
 * 한글을 그리려면 폰트 파일이 필요한데, Noto Sans KR 전체는 너무 큽니다.
 * 그래서 Google Fonts 에 `text=` 로 실제 쓰는 글자만 요청해 수 KB 짜리
 * 서브셋을 받아 씁니다.
 *
 * User-Agent 에 따라 돌려주는 포맷이 다릅니다. 최신 브라우저로 요청하면 woff2,
 * 아주 옛 IE 로 요청하면 EOT 가 오는데 둘 다 렌더러(satori)가 읽지 못합니다.
 * 아래 구형 Safari 문자열이 truetype 을 돌려주므로 그대로 두세요.
 */
const TTF_UA =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) " +
  "AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

async function loadSubsetFont(text: string, weight: number) {
  const url =
    `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}` +
    `&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, { headers: { "User-Agent": TTF_UA } }).then((r) =>
    r.text(),
  );

  const src = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!src) throw new Error("폰트 서브셋 URL 을 찾지 못했습니다");
  return fetch(src[1]).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const chars = TITLE + SUB + clinic.phone;

  let fonts;
  try {
    const [bold, regular] = await Promise.all([
      loadSubsetFont(chars, 700),
      loadSubsetFont(chars, 400),
    ]);
    fonts = [
      { name: "Noto", data: bold, weight: 700 as const, style: "normal" as const },
      { name: "Noto", data: regular, weight: 400 as const, style: "normal" as const },
    ];
  } catch {
    // 네트워크가 막힌 환경에서도 빌드는 통과해야 하므로 라틴 문자로만 그립니다.
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 96,
            background: "#1D4E7C",
            color: "#FCFCFD",
            fontSize: 68,
            letterSpacing: "0.18em",
          }}
        >
          <div>TOP DENTAL CLINIC</div>
          <div style={{ fontSize: 30, marginTop: 28, opacity: 0.75 }}>
            {clinic.phone}
          </div>
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 88,
          background: "#FCFCFD",
          fontFamily: "Noto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#515C69", fontWeight: 400 }}>{SUB}</div>
          <div
            style={{
              marginTop: 40,
              fontSize: 76,
              lineHeight: 1.32,
              letterSpacing: "-0.03em",
              color: "#16202B",
              fontWeight: 700,
              whiteSpace: "pre-wrap",
            }}
          >
            {TITLE}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 132, height: 6, background: "#1D4E7C" }} />
          <div style={{ fontSize: 34, color: "#1D4E7C", fontWeight: 700 }}>
            {clinic.phone}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
