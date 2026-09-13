/**
 * 실제 사진이 준비되기 전까지 자리와 비율만 잡아 두는 영역입니다.
 * 사진을 받으면 이 컴포넌트를 next/image 로 교체하면 됩니다.
 */
export default function Placeholder({
  label,
  ratio = "4 / 3",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-end border border-rule bg-ink/[0.04] p-4 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="text-xs text-faint">{label}</span>
    </div>
  );
}
