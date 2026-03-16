export function CareSOULLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart shape with pulse line */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>

      {/* Medical cross in center */}
      <rect x="14" y="6" width="4" height="20" fill="currentColor" opacity="0.9" />
      <rect x="6" y="14" width="20" height="4" fill="currentColor" opacity="0.9" />

      {/* Subtle heart outline */}
      <path
        d="M16 26C8 20 3 15 3 11C3 8 5 6 8 6C10 6 12 7 16 10C20 7 22 6 24 6C27 6 29 8 29 11C29 15 24 20 16 26Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  )
}
