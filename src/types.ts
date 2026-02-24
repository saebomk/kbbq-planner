export type ProteinType = 'pork' | 'beef' | 'duck'

export type SaucePreference = 'spicy' | 'savory'

export type DrinkType = 'makgeoli' | 'soju' | 'beer' | 'softdrink'

export type DessertType = 'naengmyeon' | 'kimchi-jjigae' | 'surprise'

export type RiceOption = 'none' | 'cooked' | 'fried'

export interface WizardAnswers {
  adults: number
  kids: number
  proteinCuts: string[]
  proteins: ProteinType[]
  saucePreference: SaucePreference
  sauceOptions: string[]
  vegetarian: boolean
  noBanchan: boolean
  banchanExclusions: string[]
  riceOption: RiceOption
  drinks: DrinkType[]
  desserts: DessertType[]
}

export interface GroceryItem {
  id: string
  name: string
  /** quantity per person (e.g. 200 for 200g), or fixed quantity if not per-person */
  quantityPerPerson?: number
  unit: string
  /** minimum quantity when scaled (e.g. 1 head of lettuce) */
  minQuantity?: number
  category: 'protein' | 'veggies-ssam' | 'veggies-grill' | 'kimchi' | 'sauces' | 'staples' | 'vegetarian' | 'banchan' | 'drinks' | 'dessert'
}

export interface ShoppingListItem extends GroceryItem {
  quantity: number
  checked: boolean
}

export interface ShoppingListCategory {
  id: string
  label: string
  items: ShoppingListItem[]
}

export interface SavedListEntry {
  id: string
  savedAt: string
  answers: WizardAnswers
  list: ShoppingListItem[]
}
