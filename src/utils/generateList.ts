import type { WizardAnswers, ShoppingListItem, DessertType } from '../types'
import {
  proteinCuts,
  ssamVeggieItems,
  grillVeggieItems,
  kimchiItems,
  sauceCondimentItems,
  sauceOptionsByProtein,
  stapleItems,
  riceItems,
  vegetarianItems,
  banchanItems,
  drinkItems,
  dessertItems,
  SURPRISE_OPTIONS,
} from '../data/groceryData'

const KID_SCALING_FACTOR = 0.6

function scaleQuantity(
  quantityPerPerson: number | undefined,
  minQuantity: number | undefined,
  effectivePeople: number,
  unit: string
): number {
  if (quantityPerPerson == null) return minQuantity ?? 1
  const raw = effectivePeople * quantityPerPerson
  const min = minQuantity ?? 0
  const value = Math.max(raw, min)
  if (unit === 'g' || unit === 'ml') return Math.round(value)
  if (unit === 'head' || unit === 'bunch' || unit === 'piece' || unit === 'serving' || unit === 'bottle' || unit === 'can') return Math.max(1, Math.round(value))
  if (unit === 'leaves' || unit === 'cloves') return Math.max(1, Math.round(value))
  return Math.max(1, Math.round(value * 10) / 10)
}

export function generateShoppingList(answers: WizardAnswers): ShoppingListItem[] {
  const { adults, kids, proteinCuts: selectedCuts, sauceOptions, vegetarian, noBanchan, banchanExclusions, riceOption, drinks, desserts } = answers
  const effectivePeople = adults + kids * KID_SCALING_FACTOR
  const adultDrinkCount = adults
  const items: ShoppingListItem[] = []

  // Proteins -- each selected cut
  for (const cutId of selectedCuts) {
    const def = proteinCuts.find((c) => c.id === cutId)
    if (!def) continue
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Ssam veggies
  for (const def of ssamVeggieItems) {
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Grill veggies
  for (const def of grillVeggieItems) {
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Kimchi
  for (const def of kimchiItems) {
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Sauces
  const neededSauceIds = new Set<string>()
  for (const optId of sauceOptions) {
    const opt = sauceOptionsByProtein.find((o) => o.id === optId)
    if (!opt) continue
    if (opt.id === 'ssamjang' || opt.id === 'gochujang-pork') neededSauceIds.add('ssamjang-jar')
    if (opt.id.includes('gochujang')) neededSauceIds.add('gochujang')
    if (opt.id.includes('sesame') || opt.id === 'sesame-salt') neededSauceIds.add('sesame-oil')
    if (opt.id.includes('soy') || opt.id === 'soy-beef' || opt.id === 'soy-garlic-duck') neededSauceIds.add('soy-sauce')
    if (opt.id === 'ssamjang') neededSauceIds.add('doenjang')
    if (opt.id === 'plum-sauce') neededSauceIds.add('plum-sauce-jar')
  }
  if (neededSauceIds.size === 0) {
    neededSauceIds.add('ssamjang-jar')
    neededSauceIds.add('sesame-oil')
  }
  for (const def of sauceCondimentItems) {
    if (!neededSauceIds.has(def.id)) continue
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Staples (sesame seeds, oil)
  for (const def of stapleItems) {
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Rice
  if (riceOption !== 'none') {
    const riceDefs = riceItems[riceOption]
    if (riceDefs) {
      for (const def of riceDefs) {
        const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
        items.push({ ...def, quantity: qty, checked: false })
      }
    }
  }

  // Vegetarian add-ons
  if (vegetarian) {
    for (const def of vegetarianItems) {
      const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
      items.push({ ...def, quantity: qty, checked: false })
    }
  }

  // Banchan (skip entirely if noBanchan)
  if (!noBanchan) {
    for (const def of banchanItems) {
      if (banchanExclusions.includes(def.id)) continue
      const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
      items.push({ ...def, quantity: qty, checked: false })
    }
  }

  // Drinks
  for (const d of drinks) {
    const def = drinkItems[d]
    if (!def) continue
    const scalePeople = d === 'softdrink' ? (adults + kids) : adultDrinkCount
    const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, scalePeople, def.unit)
    items.push({ ...def, quantity: qty, checked: false })
  }

  // Desserts
  let resolvedDesserts: DessertType[] = [...desserts]
  if (resolvedDesserts.includes('surprise')) {
    const pick = SURPRISE_OPTIONS[Math.floor(Math.random() * SURPRISE_OPTIONS.length)]
    resolvedDesserts = resolvedDesserts.filter((d) => d !== 'surprise')
    resolvedDesserts.push(pick)
  }
  const addedDessertIds = new Set<string>()
  for (const d of resolvedDesserts) {
    const defs = dessertItems[d]
    if (!defs) continue
    for (const def of defs) {
      if (addedDessertIds.has(def.id)) continue
      addedDessertIds.add(def.id)
      const qty = scaleQuantity(def.quantityPerPerson, def.minQuantity, effectivePeople, def.unit)
      items.push({ ...def, quantity: qty, checked: false })
    }
  }

  return items
}
