interface StepVegetarianProps {
  value: boolean
  onChange: (v: boolean) => void
  onNext: () => void
}

export function StepVegetarian({ value, onChange, onNext }: StepVegetarianProps) {
  return (
    <div className="flex flex-col flex-1 animate-slide-in">
      <h1 className="text-2xl font-semibold text-charcoal mb-1">Any vegetarians at the table?</h1>
      <p className="text-charcoal/70 mb-8">
        We'll throw in tofu, king oyster mushrooms, sweet potato, and extra ssam.
        Nobody gets left out of the ssam wrap action.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-6 rounded-xl border font-medium transition-all ${
            !value ? 'border-accent bg-accent/10 text-charcoal' : 'border-warm-border bg-warm-surface text-charcoal/70'
          }`}
        >
          All carnivore
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-6 rounded-xl border font-medium transition-all ${
            value ? 'border-accent bg-accent/10 text-charcoal' : 'border-warm-border bg-warm-surface text-charcoal/70'
          }`}
        >
          Add veggie options
        </button>
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
