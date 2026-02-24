import { useState, useRef, useCallback } from 'react'
import type { WizardAnswers, ShoppingListItem, SavedListEntry } from './types'
import { generateShoppingList } from './utils/generateList'
import { shareAsText, shareAsImage, captureListAsImage, copyListToClipboard } from './utils/shareUtils'
import { getSavedLists, saveList, deleteSavedList } from './utils/storage'
import { WizardLayout } from './components/WizardLayout'
import { StepPeople } from './components/StepPeople'
import { StepProtein } from './components/StepProtein'
import { StepSauce } from './components/StepSauce'
import { StepVegetarian } from './components/StepVegetarian'
import { StepBanchan } from './components/StepBanchan'
import { StepDrinks } from './components/StepDrinks'
import { StepDessert } from './components/StepDessert'
import { ShoppingList } from './components/ShoppingList'
import { SavedLists } from './components/SavedLists'
import { FlameIcon } from './components/FlameIcon'

type Screen = 'start' | 'wizard' | 'list' | 'saved'

const TOTAL_WIZARD_STEPS = 7

const INITIAL_ANSWERS: WizardAnswers = {
  adults: 4,
  kids: 0,
  proteinCuts: [],
  proteins: [],
  saucePreference: 'savory',
  sauceOptions: [],
  vegetarian: false,
  noBanchan: false,
  banchanExclusions: [],
  riceOption: 'cooked',
  drinks: [],
  desserts: [],
}

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS)
  const [list, setList] = useState<ShoppingListItem[]>([])
  const [savedLists, setSavedLists] = useState<SavedListEntry[]>(() => getSavedLists())
  const listRef = useRef<HTMLDivElement | null>(null)
  const [shareTextStatus, setShareTextStatus] = useState<'idle' | 'copied' | 'shared'>('idle')
  const [shareImageStatus, setShareImageStatus] = useState<'idle' | 'downloading'>('idle')

  const goToWizard = useCallback(() => {
    setStep(0)
    setAnswers(INITIAL_ANSWERS)
    setList([])
    setScreen('wizard')
  }, [])

  const handleNext = useCallback(() => {
    if (step < TOTAL_WIZARD_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      setList(generateShoppingList(answers))
      setScreen('list')
    }
  }, [step, answers])

  const handleBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1)
  }, [step])

  const toggleItem = useCallback((itemId: string, checked: boolean) => {
    setList((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, checked } : i))
    )
  }, [])

  const toggleCategory = useCallback((categoryId: string, checked: boolean) => {
    setList((prev) =>
      prev.map((i) => (i.category === categoryId ? { ...i, checked } : i))
    )
  }, [])

  const handleShareText = useCallback(async () => {
    try {
      const shared = await shareAsText(list)
      setShareTextStatus(shared ? 'shared' : 'copied')
      setTimeout(() => setShareTextStatus('idle'), 2000)
    } catch {
      await copyListToClipboard(list)
      setShareTextStatus('copied')
      setTimeout(() => setShareTextStatus('idle'), 2000)
    }
  }, [list])

  const handleShareImage = useCallback(async () => {
    const el = listRef.current
    if (!el) return
    setShareImageStatus('downloading')
    try {
      const blob = await captureListAsImage(el)
      await shareAsImage(blob)
    } finally {
      setShareImageStatus('idle')
    }
  }, [])

  const handleSave = useCallback(() => {
    saveList({
      savedAt: new Date().toISOString(),
      answers,
      list,
    })
    setSavedLists(getSavedLists())
  }, [answers, list])

  const handleRestart = useCallback(() => {
    goToWizard()
  }, [goToWizard])

  const handleOpenSaved = useCallback(() => {
    setSavedLists(getSavedLists())
    setScreen('saved')
  }, [])

  const handleSelectSaved = useCallback((entry: SavedListEntry) => {
    setAnswers(entry.answers)
    setList(entry.list)
    setScreen('list')
  }, [])

  const handleDeleteSaved = useCallback((id: string) => {
    deleteSavedList(id)
    setSavedLists(getSavedLists())
  }, [])

  if (screen === 'saved') {
    return (
      <SavedLists
        lists={savedLists}
        onSelect={handleSelectSaved}
        onDelete={handleDeleteSaved}
        onBack={() => setScreen('start')}
      />
    )
  }

  if (screen === 'list') {
    return (
      <div className="min-h-screen bg-warm-bg flex flex-col">
        <header className="sticky top-0 z-10 bg-warm-bg/95 backdrop-blur border-b border-warm-border shadow-soft safe-top">
          <div className="max-w-app mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="font-semibold text-charcoal">Your list</h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleOpenSaved}
                className="p-2 rounded-lg text-charcoal/70 hover:text-charcoal hover:bg-warm-surface transition-colors text-sm"
              >
                Saved
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="p-2 rounded-lg text-charcoal/70 hover:text-charcoal hover:bg-warm-surface transition-colors text-sm"
              >
                New list
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-app w-full mx-auto px-4 py-6 flex flex-col safe-bottom">
          <div className="mb-4 rounded-xl bg-gradient-to-br from-charcoal to-charcoal/90 p-5 shadow-card text-white text-center animate-in">
            <div className="text-3xl mb-2">🔥</div>
            <h2 className="text-lg font-semibold mb-1">
              Gogi party for {answers.adults + answers.kids}!
            </h2>
            <p className="text-sm text-white/70">
              {answers.proteinCuts.length} cut{answers.proteinCuts.length !== 1 ? 's' : ''} picked
              {answers.drinks.length > 0 && ` · ${answers.drinks.length} drink${answers.drinks.length !== 1 ? 's' : ''}`}
              {' '}· {list.length} items total
            </p>
            <p className="text-xs text-white/50 mt-2">Time to hit the store 🛒</p>
          </div>
          <div className="mb-6 rounded-xl border border-warm-border bg-white p-4 shadow-card" ref={listRef}>
            <div className="text-center mb-4 pb-3 border-b border-warm-border">
              <h2 className="text-lg font-semibold text-charcoal">Korean BBQ Shopping List</h2>
              <p className="text-sm text-charcoal/60">{new Date().toLocaleDateString()}</p>
            </div>
            <ShoppingList
              items={list}
              onToggle={toggleItem}
              onToggleCategory={toggleCategory}
            />
          </div>
          <div className="flex flex-col gap-3 mt-auto pt-4">
            <button
              type="button"
              onClick={handleShareText}
              className="w-full py-3 rounded-xl border border-warm-border bg-warm-surface font-medium text-charcoal hover:border-accent/50 transition-colors"
            >
              {shareTextStatus === 'copied' ? 'Copied!' : shareTextStatus === 'shared' ? 'Shared!' : 'Share as text'}
            </button>
            <button
              type="button"
              onClick={handleShareImage}
              disabled={shareImageStatus === 'downloading'}
              className="w-full py-3 rounded-xl border border-warm-border bg-warm-surface font-medium text-charcoal hover:border-accent/50 transition-colors disabled:opacity-60"
            >
              {shareImageStatus === 'downloading' ? 'Creating image...' : 'Share as image'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors"
            >
              Save list
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (screen === 'wizard') {
    return (
      <WizardLayout step={step + 1} onBack={step > 0 ? handleBack : undefined}>
        {step === 0 && (
          <StepPeople
            adults={answers.adults}
            kids={answers.kids}
            onAdultsChange={(adults) => setAnswers((a) => ({ ...a, adults }))}
            onKidsChange={(kids) => setAnswers((a) => ({ ...a, kids }))}
            onNext={handleNext}
          />
        )}
        {step === 1 && (
          <StepProtein
            selected={answers.proteinCuts}
            onChange={(proteinCuts, proteins) => setAnswers((a) => ({ ...a, proteinCuts, proteins }))}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <StepSauce
            proteins={answers.proteins}
            preference={answers.saucePreference}
            selectedOptionIds={answers.sauceOptions}
            onPreferenceChange={(saucePreference) =>
              setAnswers((a) => ({ ...a, saucePreference, sauceOptions: [] }))
            }
            onOptionsChange={(sauceOptions) => setAnswers((a) => ({ ...a, sauceOptions }))}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <StepVegetarian
            value={answers.vegetarian}
            onChange={(vegetarian) => setAnswers((a) => ({ ...a, vegetarian }))}
            onNext={handleNext}
          />
        )}
        {step === 4 && (
          <StepBanchan
            noBanchan={answers.noBanchan}
            exclusions={answers.banchanExclusions}
            riceOption={answers.riceOption}
            onNoBanchanChange={(noBanchan) => setAnswers((a) => ({ ...a, noBanchan }))}
            onExclusionsChange={(banchanExclusions) => setAnswers((a) => ({ ...a, banchanExclusions }))}
            onRiceChange={(riceOption) => setAnswers((a) => ({ ...a, riceOption }))}
            onNext={handleNext}
          />
        )}
        {step === 5 && (
          <StepDrinks
            selected={answers.drinks}
            onChange={(drinks) => setAnswers((a) => ({ ...a, drinks }))}
            onNext={handleNext}
          />
        )}
        {step === 6 && (
          <StepDessert
            selected={answers.desserts}
            onChange={(desserts) => setAnswers((a) => ({ ...a, desserts }))}
            onNext={handleNext}
          />
        )}
      </WizardLayout>
    )
  }

  // Start screen
  return (
    <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center px-4 safe-top safe-bottom">
      <div className="max-w-app w-full text-center">
        <div className="mb-6 text-5xl">🔥</div>
        <h1 className="text-2xl font-semibold text-charcoal mb-2">Korean BBQ Shopping List</h1>
        <p className="text-charcoal/70 mb-1">
          Tell us about your gogi party and we'll handle the grocery math.
        </p>
        <p className="text-sm text-charcoal/50 mb-10">
          Portions, banchan, drinks, the works.
        </p>
        <button
          type="button"
          onClick={goToWizard}
          className="w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors mb-3"
        >
          Let's eat
        </button>
        <button
          type="button"
          onClick={handleOpenSaved}
          className="w-full py-3 rounded-xl border border-warm-border bg-warm-surface text-charcoal font-medium hover:border-accent/50 transition-colors"
        >
          Saved lists
        </button>
      </div>
    </div>
  )
}

export default App
