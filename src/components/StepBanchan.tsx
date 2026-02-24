import type { RiceOption } from '../types'
import { BANCHAN_IMAGES } from '../data/images'
import { FoodThumb } from './FoodThumb'

const BANCHAN_OPTIONS = [
  { id: 'kongnamul', name: 'Kongnamul (bean sprouts)' },
  { id: 'sigeumchi', name: 'Sigeumchi-namul (spinach)' },
  { id: 'gamja-jorim', name: 'Gamja-jorim (braised potato)' },
  { id: 'gyeran-jjim', name: 'Gyeran-jjim (steamed egg)' },
  { id: 'japchae', name: 'Japchae (glass noodles)' },
  { id: 'eomuk', name: 'Eomuk-bokkeum (fish cake)' },
] as const

const RICE_OPTIONS: { id: RiceOption; label: string; sub: string }[] = [
  { id: 'cooked', label: 'Cooked rice', sub: 'Classic steamed bap' },
  { id: 'fried', label: 'Fried rice', sub: 'Bokkeumbap with egg & veggies' },
  { id: 'none', label: 'No rice', sub: 'Living on the edge' },
]

interface StepBanchanProps {
  noBanchan: boolean
  exclusions: string[]
  riceOption: RiceOption
  onNoBanchanChange: (v: boolean) => void
  onExclusionsChange: (exclusions: string[]) => void
  onRiceChange: (r: RiceOption) => void
  onNext: () => void
}

export function StepBanchan({
  noBanchan,
  exclusions,
  riceOption,
  onNoBanchanChange,
  onExclusionsChange,
  onRiceChange,
  onNext,
}: StepBanchanProps) {
  const toggleExclusion = (id: string) => {
    if (exclusions.includes(id)) {
      onExclusionsChange(exclusions.filter((x) => x !== id))
    } else {
      onExclusionsChange([...exclusions, id])
    }
  }

  const hateCount = exclusions.length

  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">Sides & rice</h1>
      <p className="text-charcoal/70 mb-6">
        Banchan and rice -- the backbone of any Korean table.
      </p>

      {/* Rice picker */}
      <p className="text-sm font-medium text-charcoal/70 mb-2">Rice</p>
      <div className="flex gap-2 mb-6">
        {RICE_OPTIONS.map(({ id, label, sub }) => (
          <button
            key={id}
            type="button"
            onClick={() => onRiceChange(id)}
            className={`flex-1 py-3 px-2 rounded-xl border text-center transition-all ${
              riceOption === id
                ? 'border-accent bg-accent/10 text-charcoal'
                : 'border-warm-border bg-warm-surface text-charcoal/70 hover:border-charcoal/20'
            }`}
          >
            <span className="text-sm font-medium block">{label}</span>
            <span className="text-[11px] text-charcoal/50 block mt-0.5 leading-tight">{sub}</span>
          </button>
        ))}
      </div>

      {/* Banchan toggle */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-charcoal/70">Banchan</p>
        <button
          type="button"
          onClick={() => onNoBanchanChange(!noBanchan)}
          className={`text-sm font-medium px-3 py-1 rounded-full transition-all ${
            noBanchan
              ? 'bg-red-50 text-red-500 border border-red-200'
              : 'bg-warm-surface text-charcoal/60 border border-warm-border hover:border-charcoal/20'
          }`}
        >
          {noBanchan ? 'Banchan off' : 'Skip all banchan'}
        </button>
      </div>

      {noBanchan ? (
        <div className="rounded-xl border border-dashed border-warm-border p-6 text-center">
          <p className="text-charcoal/50">No banchan? Your haelmoni would be disappointed.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-charcoal/50 mb-3">Tap any dish your crew can't stand to remove it.</p>
          <div className="space-y-2">
            {BANCHAN_OPTIONS.map(({ id, name }) => {
              const hated = exclusions.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleExclusion(id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    hated
                      ? 'border-red-300 bg-red-50 text-charcoal/50'
                      : 'border-warm-border bg-warm-surface hover:border-charcoal/20'
                  }`}
                >
                  <FoodThumb src={BANCHAN_IMAGES[id]} alt={name} size="sm" />
                  <span className={`flex-1 font-medium ${hated ? 'line-through' : ''}`}>{name}</span>
                  {hated && <span className="text-sm text-red-400 flex-shrink-0">nope</span>}
                </button>
              )
            })}
          </div>
          {hateCount > 0 && (
            <p className="text-sm text-charcoal/60 mt-3 text-center">
              {hateCount === BANCHAN_OPTIONS.length
                ? 'Really? ALL of them? Bold move.'
                : `${hateCount} banchan banished.`}
            </p>
          )}
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

export { BANCHAN_OPTIONS }
