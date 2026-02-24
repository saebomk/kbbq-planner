import type { DrinkType } from '../types'
import { DRINK_IMAGES } from '../data/images'
import { FoodThumb } from './FoodThumb'

const DRINK_OPTIONS: { id: DrinkType; label: string; tagline: string }[] = [
  { id: 'makgeoli', label: 'Makgeoli', tagline: 'The OG rice wine' },
  { id: 'soju', label: 'Soju', tagline: 'Hana, dul, set -- shot!' },
  { id: 'beer', label: 'Beer', tagline: 'Somaek anyone?' },
  { id: 'softdrink', label: 'Soft drinks', tagline: 'Cider & cola vibes' },
]

interface StepDrinksProps {
  selected: DrinkType[]
  onChange: (selected: DrinkType[]) => void
  onNext: () => void
}

export function StepDrinks({ selected, onChange, onNext }: StepDrinksProps) {
  const toggle = (id: DrinkType) => {
    if (selected.includes(id)) {
      onChange(selected.filter((d) => d !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">What are we drinking?</h1>
      <p className="text-charcoal/70 mb-2">
        No Korean BBQ is complete without the right beverage pairing.
      </p>
      <p className="text-xs text-charcoal/50 mb-6">Optional -- skip if you're just hydrating with water.</p>
      <div className="space-y-3">
        {DRINK_OPTIONS.map(({ id, label, tagline }) => {
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
              <FoodThumb src={DRINK_IMAGES[id]} alt={label} />
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
          Next
        </button>
      </div>
    </div>
  )
}
