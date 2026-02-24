interface StepPeopleProps {
  adults: number
  kids: number
  onAdultsChange: (n: number) => void
  onKidsChange: (n: number) => void
  onNext: () => void
}

function Counter({
  label,
  sublabel,
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  label: string
  sublabel: string
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <span className="font-medium text-charcoal">{label}</span>
        <span className="block text-sm text-charcoal/60">{sublabel}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-11 h-11 rounded-full border border-warm-border bg-warm-surface text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:bg-accent/10 transition-colors flex items-center justify-center text-lg font-medium"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="text-2xl font-semibold text-charcoal tabular-nums min-w-[2.5rem] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-11 h-11 rounded-full border border-warm-border bg-warm-surface text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:bg-accent/10 transition-colors flex items-center justify-center text-lg font-medium"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export function StepPeople({ adults, kids, onAdultsChange, onKidsChange, onNext }: StepPeopleProps) {
  const total = adults + kids
  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">
        Who's coming to the gogi party?
      </h1>
      <p className="text-charcoal/70 mb-6">
        Kids get smaller portions -- more meat for the adults. Win-win.
      </p>
      <div className="rounded-xl border border-warm-border bg-warm-surface/50 p-4 shadow-soft divide-y divide-warm-border">
        <Counter
          label="Adults"
          sublabel="Full portions"
          value={adults}
          onChange={onAdultsChange}
          min={1}
        />
        <Counter
          label="Kids"
          sublabel="~60% portions"
          value={kids}
          onChange={onKidsChange}
        />
      </div>
      <p className="text-center text-sm text-charcoal/60 mt-4">
        {total} {total === 1 ? 'mouth' : 'mouths'} to feed
      </p>
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
