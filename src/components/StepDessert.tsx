import type { DessertType } from '../types'
import { DESSERT_IMAGES } from '../data/images'
import { FoodThumb } from './FoodThumb'

const DESSERT_OPTIONS: { id: DessertType; label: string; tagline: string; fallback: string }[] = [
  { id: 'naengmyeon', label: 'Naengmyeon', tagline: 'Cold noodles to cool the fire', fallback: '' },
  { id: 'kimchi-jjigae', label: 'Kimchi Jjigae', tagline: 'Because one pot of stew never hurts', fallback: '' },
  { id: 'surprise', label: 'Surprise Me', tagline: "Dealer's choice -- we'll pick for you", fallback: '' },
]

interface StepDessertProps {
  selected: DessertType[]
  onChange: (selected: DessertType[]) => void
  onNext: () => void
}

export function StepDessert({ selected, onChange, onNext }: StepDessertProps) {
  const toggle = (id: DessertType) => {
    if (selected.includes(id)) {
      onChange(selected.filter((d) => d !== id))
    } else {
      if (id === 'surprise') {
        onChange(['surprise'])
      } else {
        onChange([...selected.filter((d) => d !== 'surprise'), id])
      }
    }
  }

  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">After-gogi carbs?</h1>
      <p className="text-charcoal/70 mb-2">
        The meal isn't over until the noodles or jjigae hit the table.
      </p>
      <p className="text-xs text-charcoal/50 mb-6">Optional -- skip if you're truly stuffed.</p>
      <div className="space-y-3">
        {DESSERT_OPTIONS.map(({ id, label, tagline }) => {
          const isSelected = selected.includes(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-accent bg-accent/10 shadow-card'
                  : 'border-warm-border bg-warm-surface hover:border-charcoal/20'
              }`}
            >
              <FoodThumb
                src={DESSERT_IMAGES[id]}
                alt={label}
                fallbackEmoji={id === 'surprise' ? '🎲' : undefined}
              />
              <div className="flex-1">
                <span className="font-medium text-charcoal block">{label}</span>
                <span className="text-sm text-charcoal/60">{tagline}</span>
              </div>
              {isSelected && (
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors"
        >
          Create my list
        </button>
      </div>
    </div>
  )
}
