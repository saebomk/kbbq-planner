import type { ProteinType } from '../types'
import { proteinCuts, getProteinTypesFromCuts } from '../data/groceryData'
import { PROTEIN_IMAGES } from '../data/images'

const GROUPS: { type: ProteinType; label: string }[] = [
  { type: 'pork', label: 'Pork' },
  { type: 'beef', label: 'Beef' },
  { type: 'duck', label: 'Duck' },
]

interface StepProteinProps {
  selected: string[]
  onChange: (cutIds: string[], proteinTypes: ProteinType[]) => void
  onNext: () => void
}

export function StepProtein({ selected, onChange, onNext }: StepProteinProps) {
  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id]
    onChange(next, getProteinTypesFromCuts(next))
  }

  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">Pick your gogi</h1>
      <p className="text-charcoal/70 mb-6">Mix and match cuts. Go ahead, nobody judges a loaded grill.</p>
      <div className="space-y-6">
        {GROUPS.map(({ type, label }) => {
          const cuts = proteinCuts.filter((c) => c.proteinType === type)
          return (
            <div key={type}>
              <p className="text-sm font-medium text-charcoal/70 mb-2">{label}</p>
              <div className="grid grid-cols-2 gap-2.5">
                {cuts.map((cut) => {
                  const isSelected = selected.includes(cut.id)
                  const img = PROTEIN_IMAGES[cut.id]
                  return (
                    <button
                      key={cut.id}
                      type="button"
                      onClick={() => toggle(cut.id)}
                      className={`relative flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-accent shadow-card ring-1 ring-accent/30'
                          : 'border-warm-border bg-warm-surface hover:border-charcoal/20'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full bg-warm-surface overflow-hidden">
                        {img && (
                          <img
                            src={img}
                            alt={cut.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="px-2.5 py-2">
                        <span className="text-sm font-medium text-charcoal leading-tight block">
                          {cut.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onNext}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
