import type { GroceryItem, ProteinType, SaucePreference } from '../types'

/** A specific protein cut linked to its parent category */
export interface ProteinCut extends GroceryItem {
  proteinType: ProteinType
}

export const proteinCuts: ProteinCut[] = [
  // Pork cuts
  { id: 'samgyeopsal', name: 'Samgyeopsal (pork belly)', proteinType: 'pork', quantityPerPerson: 200, unit: 'g', minQuantity: 400, category: 'protein' },
  { id: 'moksal', name: 'Moksal (pork collar)', proteinType: 'pork', quantityPerPerson: 180, unit: 'g', minQuantity: 400, category: 'protein' },
  { id: 'hangjeongsal', name: 'Hangjeongsal (pork jowl)', proteinType: 'pork', quantityPerPerson: 150, unit: 'g', minQuantity: 300, category: 'protein' },
  // Beef cuts
  { id: 'buchaesal', name: 'Buchaesal (top blade)', proteinType: 'beef', quantityPerPerson: 200, unit: 'g', minQuantity: 400, category: 'protein' },
  { id: 'galbi', name: 'Galbi (short ribs)', proteinType: 'beef', quantityPerPerson: 250, unit: 'g', minQuantity: 500, category: 'protein' },
  { id: 'kkotsal', name: 'Kkotsal (boneless short rib)', proteinType: 'beef', quantityPerPerson: 180, unit: 'g', minQuantity: 400, category: 'protein' },
  // Duck
  { id: 'smoked-duck', name: 'Smoked duck (hun-je ori)', proteinType: 'duck', quantityPerPerson: 200, unit: 'g', minQuantity: 400, category: 'protein' },
]

/** Helper: get unique ProteinType categories from selected cut IDs */
export function getProteinTypesFromCuts(cutIds: string[]): ProteinType[] {
  const types = new Set<ProteinType>()
  for (const id of cutIds) {
    const cut = proteinCuts.find((c) => c.id === id)
    if (cut) types.add(cut.proteinType)
  }
  return Array.from(types)
}

/** Ssam vegetables (wrapping greens & accompaniments) */
export const ssamVeggieItems: GroceryItem[] = [
  { id: 'lettuce', name: 'Lettuce (for ssam)', quantityPerPerson: 0.5, unit: 'head', minQuantity: 1, category: 'veggies-ssam' },
  { id: 'perilla', name: 'Perilla leaves', quantityPerPerson: 5, unit: 'leaves', minQuantity: 10, category: 'veggies-ssam' },
  { id: 'garlic', name: 'Garlic cloves', quantityPerPerson: 2, unit: 'cloves', minQuantity: 6, category: 'veggies-ssam' },
  { id: 'chili', name: 'Chili peppers (green)', quantityPerPerson: 0.5, unit: 'piece', minQuantity: 2, category: 'veggies-ssam' },
]

/** Grill vegetables (go on the grill alongside the meat) */
export const grillVeggieItems: GroceryItem[] = [
  { id: 'green-onion', name: 'Green onions', quantityPerPerson: 0.5, unit: 'bunch', minQuantity: 1, category: 'veggies-grill' },
  { id: 'onion', name: 'Onion', quantityPerPerson: 0.25, unit: 'piece', minQuantity: 1, category: 'veggies-grill' },
  { id: 'mushrooms', name: 'Mushrooms', quantityPerPerson: 50, unit: 'g', minQuantity: 100, category: 'veggies-grill' },
]

/** Kimchi */
export const kimchiItems: GroceryItem[] = [
  { id: 'baechu-kimchi', name: 'Baechu kimchi', quantityPerPerson: 80, unit: 'g', minQuantity: 200, category: 'kimchi' },
  { id: 'kkakdugi', name: 'Kkakdugi (radish kimchi)', quantityPerPerson: 50, unit: 'g', minQuantity: 100, category: 'kimchi' },
  { id: 'pa-kimchi', name: 'Pa-kimchi (green onion)', quantityPerPerson: 30, unit: 'g', minQuantity: 50, category: 'kimchi' },
]

/** Sauce options by protein and preference */
export interface SauceOption {
  id: string
  name: string
  protein: ProteinType
  preference: SaucePreference
}

export const sauceOptionsByProtein: SauceOption[] = [
  { id: 'ssamjang', name: 'Ssamjang', protein: 'pork', preference: 'savory' },
  { id: 'gochujang-pork', name: 'Gochujang-based (pork)', protein: 'pork', preference: 'spicy' },
  { id: 'salt-pepper', name: 'Salt & pepper', protein: 'pork', preference: 'savory' },
  { id: 'sesame-salt', name: 'Sesame oil + salt', protein: 'beef', preference: 'savory' },
  { id: 'soy-beef', name: 'Soy-based dipping sauce', protein: 'beef', preference: 'savory' },
  { id: 'spicy-beef', name: 'Spicy gochujang (beef)', protein: 'beef', preference: 'spicy' },
  { id: 'gochujang-duck', name: 'Gochujang glaze', protein: 'duck', preference: 'spicy' },
  { id: 'plum-sauce', name: 'Plum sauce', protein: 'duck', preference: 'savory' },
  { id: 'soy-garlic-duck', name: 'Soy garlic', protein: 'duck', preference: 'savory' },
]

/** Condiments to include when certain sauces are selected */
export const sauceCondimentItems: GroceryItem[] = [
  { id: 'ssamjang-jar', name: 'Ssamjang', quantityPerPerson: 30, unit: 'g', minQuantity: 100, category: 'sauces' },
  { id: 'gochujang', name: 'Gochujang', quantityPerPerson: 20, unit: 'g', minQuantity: 100, category: 'sauces' },
  { id: 'sesame-oil', name: 'Sesame oil', quantityPerPerson: 10, unit: 'ml', minQuantity: 50, category: 'sauces' },
  { id: 'soy-sauce', name: 'Soy sauce', quantityPerPerson: 15, unit: 'ml', minQuantity: 50, category: 'sauces' },
  { id: 'doenjang', name: 'Doenjang', quantityPerPerson: 15, unit: 'g', minQuantity: 50, category: 'sauces' },
  { id: 'plum-sauce-jar', name: 'Plum sauce', quantityPerPerson: 20, unit: 'g', minQuantity: 50, category: 'sauces' },
]

/** Staples (excluding rice, which is handled separately) */
export const stapleItems: GroceryItem[] = [
  { id: 'sesame-seeds', name: 'Sesame seeds', quantityPerPerson: 5, unit: 'g', minQuantity: 20, category: 'staples' },
  { id: 'cooking-oil', name: 'Cooking oil', quantityPerPerson: 10, unit: 'ml', minQuantity: 30, category: 'staples' },
]

/** Rice options */
export const riceItems: Record<string, GroceryItem[]> = {
  cooked: [
    { id: 'rice', name: 'Rice', quantityPerPerson: 100, unit: 'g', minQuantity: 200, category: 'staples' },
  ],
  fried: [
    { id: 'rice-fried', name: 'Rice (for fried rice)', quantityPerPerson: 120, unit: 'g', minQuantity: 200, category: 'staples' },
    { id: 'fried-rice-egg', name: 'Eggs (for fried rice)', quantityPerPerson: 0.5, unit: 'piece', minQuantity: 2, category: 'staples' },
    { id: 'fried-rice-veg', name: 'Mixed vegetables (for fried rice)', quantityPerPerson: 30, unit: 'g', minQuantity: 100, category: 'staples' },
  ],
}

/** Vegetarian add-ons */
export const vegetarianItems: GroceryItem[] = [
  { id: 'tofu', name: 'Firm tofu', quantityPerPerson: 80, unit: 'g', minQuantity: 200, category: 'vegetarian' },
  { id: 'king-oyster', name: 'King oyster mushrooms', quantityPerPerson: 50, unit: 'g', minQuantity: 150, category: 'vegetarian' },
  { id: 'sweet-potato', name: 'Sweet potato', quantityPerPerson: 0.25, unit: 'piece', minQuantity: 1, category: 'vegetarian' },
  { id: 'extra-lettuce', name: 'Extra lettuce (ssam)', quantityPerPerson: 0.25, unit: 'head', minQuantity: 1, category: 'vegetarian' },
]

/** Banchan side dishes (default included, user can exclude) */
export const banchanItems: GroceryItem[] = [
  { id: 'kongnamul', name: 'Kongnamul (bean sprouts)', quantityPerPerson: 40, unit: 'g', minQuantity: 100, category: 'banchan' },
  { id: 'sigeumchi', name: 'Sigeumchi-namul (spinach)', quantityPerPerson: 30, unit: 'g', minQuantity: 80, category: 'banchan' },
  { id: 'gamja-jorim', name: 'Gamja-jorim (potatoes)', quantityPerPerson: 0.5, unit: 'piece', minQuantity: 2, category: 'banchan' },
  { id: 'gyeran-jjim', name: 'Eggs (for gyeran-jjim)', quantityPerPerson: 1, unit: 'piece', minQuantity: 3, category: 'banchan' },
  { id: 'japchae', name: 'Japchae sweet potato noodles', quantityPerPerson: 30, unit: 'g', minQuantity: 100, category: 'banchan' },
  { id: 'eomuk', name: 'Eomuk (fish cake)', quantityPerPerson: 30, unit: 'g', minQuantity: 100, category: 'banchan' },
]

/** Drink items */
export const drinkItems: Record<string, GroceryItem> = {
  makgeoli: { id: 'makgeoli', name: 'Makgeoli', quantityPerPerson: 1, unit: 'bottle', minQuantity: 1, category: 'drinks' },
  soju: { id: 'soju', name: 'Soju', quantityPerPerson: 0.5, unit: 'bottle', minQuantity: 1, category: 'drinks' },
  beer: { id: 'beer', name: 'Beer', quantityPerPerson: 1, unit: 'can', minQuantity: 2, category: 'drinks' },
  softdrink: { id: 'softdrink', name: 'Soft drinks (cola/cider)', quantityPerPerson: 1, unit: 'can', minQuantity: 2, category: 'drinks' },
}

/** Dessert / after-gogi carbs */
export const dessertItems: Record<string, GroceryItem[]> = {
  naengmyeon: [
    { id: 'naengmyeon-noodles', name: 'Naengmyeon noodles', quantityPerPerson: 1, unit: 'serving', minQuantity: 2, category: 'dessert' },
    { id: 'naengmyeon-broth', name: 'Naengmyeon broth (dongchimi)', quantityPerPerson: 250, unit: 'ml', minQuantity: 500, category: 'dessert' },
    { id: 'naengmyeon-mustard', name: 'Hot mustard + vinegar', quantityPerPerson: 5, unit: 'g', minQuantity: 10, category: 'dessert' },
    { id: 'boiled-egg', name: 'Eggs (for naengmyeon)', quantityPerPerson: 0.5, unit: 'piece', minQuantity: 2, category: 'dessert' },
  ],
  'kimchi-jjigae': [
    { id: 'aged-kimchi', name: 'Aged kimchi (for jjigae)', quantityPerPerson: 80, unit: 'g', minQuantity: 200, category: 'dessert' },
    { id: 'jjigae-tofu', name: 'Soft tofu (for jjigae)', quantityPerPerson: 50, unit: 'g', minQuantity: 150, category: 'dessert' },
    { id: 'jjigae-pork', name: 'Pork shoulder (for jjigae)', quantityPerPerson: 30, unit: 'g', minQuantity: 100, category: 'dessert' },
  ],
}

/** "Surprise me" picks one of these at random */
export const SURPRISE_OPTIONS: ('naengmyeon' | 'kimchi-jjigae')[] = ['naengmyeon', 'kimchi-jjigae']
