interface FlameIconProps {
  className?: string
  size?: number
}

export function FlameIcon({ className = '', size = 48 }: FlameIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 22c4.42 0 8-3.13 8-7 0-2.5-1.2-4.7-3.1-6.2-.4.9-.9 1.8-1.5 2.5-.6.7-1.4 1.2-2.4 1.5V22h1zm-2 0h-1v-3.2c-1-.3-1.8-.8-2.4-1.5-.6-.7-1.1-1.6-1.5-2.5C5.2 10.3 4 12.5 4 15c0 3.87 3.58 7 8 7zm2-19c-1.2 2-2.5 3.5-2.5 5.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1.3-3.5-2.5-5.5z"
        fill="currentColor"
      />
    </svg>
  )
}
