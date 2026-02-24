import type { SaucePreference, ProteinType } from '../types'
import { sauceOptionsByProtein } from '../data/groceryData'

interface StepSauceProps {
  proteins: ProteinType[]
  preference: SaucePreference
  selectedOptionIds: string[]
  onPreferenceChange: (p: SaucePreference) => void
  onOptionsChange: (ids: string[]) => void
  onNext: () => void
}

export function StepSauce({
  proteins,
  preference,
  selectedOptionIds,
  onPreferenceChange,
  onOptionsChange,
  onNext,
}: StepSauceProps) {
  const options = sauceOptionsByProtein.filter(
    (o) => proteins.includes(o.protein) && o.preference === preference
  )

  const toggleOption = (id: string) => {
    if (selectedOptionIds.includes(id)) {
      onOptionsChange(selectedOptionIds.filter((x) => x !== id))
    } else {
      onOptionsChange([...selectedOptionIds, id])
    }
  }

  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">Sauce game</h1>
      <p className="text-charcoal/70 mb-6">Are you a fire-breather or a flavor-chaser? Pick your vibe.</p>
      <div className="flex gap-3 mb-8">
        <button
          type="button"
          onClick={() => onPreferenceChange('spicy')}
          className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
            preference === 'spicy'
              ? 'border-accent bg-accent/10 text-charcoal'
              : 'border-warm-border bg-warm-surface text-charcoal/70 hover:border-charcoal/20'
          }`}
        >
          Spicy
        </button>
        <button
          type="button"
          onClick={() => onPreferenceChange('savory')}
          className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
            preference === 'savory'
              ? 'border-accent bg-accent/10 text-charcoal'
              : 'border-warm-border bg-warm-surface text-charcoal/70 hover:border-charcoal/20'
          }`}
        >
          Savory
        </button>
      </div>
      {options.length > 0 && (
        <>
          <p className="text-sm text-charcoal/70 mb-3">Pick sauces for your list:</p>
          <div className="space-y-2">
            {options.map((opt) => {
              const isSelected = selectedOptionIds.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleOption(opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/10'
                      : 'border-warm-border bg-warm-surface hover:border-charcoal/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-accent bg-accent' : 'border-charcoal/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-charcoal">{opt.name}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
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
