export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect
        x="4"
        y="8"
        width="24"
        height="18"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M10 8V7.2C10 4.4 12.7 2.2 16 2.2S22 4.4 22 7.2V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="16" cy="16.5" r="1.6" fill="currentColor" />
    </svg>
  );
}
