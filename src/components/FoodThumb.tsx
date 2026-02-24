interface FoodThumbProps {
  src: string | undefined
  alt: string
  fallbackEmoji?: string
  size?: 'sm' | 'md'
}

export function FoodThumb({ src, alt, fallbackEmoji, size = 'md' }: FoodThumbProps) {
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14'

  if (!src && fallbackEmoji) {
    return (
      <span className={`${dim} flex items-center justify-center text-2xl flex-shrink-0`} aria-hidden>
        {fallbackEmoji}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${dim} rounded-lg object-cover flex-shrink-0 bg-warm-surface`}
    />
  )
}
