/**
 * 캘리퍼 눈금을 본뜬 구분선.
 * 치과 진료의 '계측'을 구조 장치로 쓴 것이라 장식으로 남발하지 않습니다.
 */
export default function Measure({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-2 w-full border-t border-rule ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, var(--color-rule) 0 1px, transparent 1px 14px)",
        backgroundSize: "100% 5px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
