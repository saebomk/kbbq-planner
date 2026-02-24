import type { ReactNode } from 'react'

const TOTAL_STEPS = 7

interface WizardLayoutProps {
  step: number
  onBack?: () => void
  children: ReactNode
  showProgress?: boolean
}

export function WizardLayout({ step, onBack, children, showProgress = true }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      {showProgress && (
        <header className="sticky top-0 z-10 bg-warm-bg/95 backdrop-blur border-b border-warm-border shadow-soft safe-top">
          <div className="max-w-app mx-auto px-4 py-3 flex items-center justify-between">
            {onBack && step > 0 ? (
              <button
                type="button"
                onClick={onBack}
                className="p-2 -ml-2 rounded-lg text-charcoal/70 hover:text-charcoal hover:bg-warm-surface transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div className="w-9" />
            )}
            <div className="flex-1 max-w-[200px] mx-4">
              <div className="h-1.5 bg-warm-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-charcoal/60 tabular-nums w-9 text-right">
              {step}/{TOTAL_STEPS}
            </span>
          </div>
        </header>
      )}
      <main className="flex-1 flex flex-col max-w-app w-full mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
