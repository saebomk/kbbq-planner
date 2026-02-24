import { useState } from 'react'
import type { SavedListEntry, WizardAnswers } from '../types'

interface SavedListsProps {
  lists: SavedListEntry[]
  onSelect: (entry: SavedListEntry) => void
  onDelete: (id: string) => void
  onBack: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })
}

function formatPeople(answers: WizardAnswers): string {
  const parts: string[] = []
  const adults = answers.adults ?? 0
  if (adults) parts.push(`${adults} adult${adults !== 1 ? 's' : ''}`)
  if (answers.kids) parts.push(`${answers.kids} kid${answers.kids !== 1 ? 's' : ''}`)
  return parts.join(', ') || 'unknown'
}

export function SavedLists({ lists, onSelect, onDelete, onBack }: SavedListsProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      onDelete(id)
      setConfirmDeleteId(null)
    } else {
      setConfirmDeleteId(id)
    }
  }

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      <header className="sticky top-0 z-10 bg-warm-bg/95 backdrop-blur border-b border-warm-border shadow-soft safe-top">
        <div className="max-w-app mx-auto px-4 py-3 flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg text-charcoal/70 hover:text-charcoal hover:bg-warm-surface transition-colors"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-center font-semibold text-charcoal mr-10">Saved lists</h1>
        </div>
      </header>
      <main className="flex-1 max-w-app w-full mx-auto px-4 py-6">
        {lists.length === 0 ? (
          <p className="text-charcoal/70 text-center py-12">No saved lists yet.</p>
        ) : (
          <ul className="space-y-3">
            {lists.map((entry) => {
              const isConfirming = confirmDeleteId === entry.id
              return (
                <li key={entry.id} className="relative">
                  <div className="flex items-stretch gap-2">
                    <button
                      type="button"
                      onClick={() => onSelect(entry)}
                      className="flex-1 flex items-center justify-between p-4 rounded-xl border border-warm-border bg-warm-surface shadow-soft hover:border-accent/50 transition-colors text-left"
                    >
                  <span className="font-medium text-charcoal">
                    {formatPeople(entry.answers)} &middot; {(entry.answers.proteinCuts ?? entry.answers.proteins).join(', ')}
                  </span>
                      <span className="text-sm text-charcoal/60 ml-2 flex-shrink-0">{formatDate(entry.savedAt)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className={`flex-shrink-0 w-11 rounded-xl border flex items-center justify-center transition-all ${
                        isConfirming
                          ? 'border-red-300 bg-red-50 text-red-500'
                          : 'border-warm-border bg-warm-surface text-charcoal/40 hover:text-red-400 hover:border-red-200'
                      }`}
                      aria-label={isConfirming ? 'Confirm delete' : 'Delete list'}
                      title={isConfirming ? 'Tap again to confirm' : 'Delete'}
                    >
                      {isConfirming ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
