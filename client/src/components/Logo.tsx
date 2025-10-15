export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 80 L20 30 Q20 20, 30 20 L40 20 Q50 20, 50 30 L50 80"
        stroke="black"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 80 L50 30 Q50 20, 60 20 L70 20 Q80 20, 80 30 L80 80"
        stroke="black"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
