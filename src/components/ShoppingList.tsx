import type { ShoppingListItem, ShoppingListCategory } from '../types'

const CATEGORY_LABELS: Record<string, string> = {
  protein: 'Proteins',
  'veggies-ssam': 'Ssam veggies',
  'veggies-grill': 'Grill veggies',
  kimchi: 'Kimchi',
  sauces: 'Sauces & condiments',
  staples: 'Staples',
  vegetarian: 'Vegetarian',
  banchan: 'Banchan (side dishes)',
  drinks: 'Drinks',
  dessert: 'After-gogi carbs',
}

function groupByCategory(items: ShoppingListItem[]): ShoppingListCategory[] {
  const map = new Map<string, ShoppingListItem[]>()
  for (const item of items) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  const order = ['protein', 'veggies-ssam', 'veggies-grill', 'kimchi', 'sauces', 'staples', 'vegetarian', 'banchan', 'drinks', 'dessert']
  return order
    .filter((id) => map.has(id))
    .map((id) => ({
      id,
      label: CATEGORY_LABELS[id] ?? id,
      items: map.get(id)!,
    }))
}

function formatQuantity(item: ShoppingListItem): string {
  const q = item.quantity
  const u = item.unit
  if (u === 'g' || u === 'ml') return `${q} ${u}`
  if (u === 'head' || u === 'bunch' || u === 'piece' || u === 'serving' || u === 'bottle' || u === 'can') return `${q} ${u}${q !== 1 ? 's' : ''}`
  if (u === 'leaves' || u === 'cloves') return `${q} ${u}`
  return `${q} ${u}`
}

interface ShoppingListProps {
  items: ShoppingListItem[]
  onToggle: (itemId: string, checked: boolean) => void
  onToggleCategory?: (categoryId: string, checked: boolean) => void
}

export function ShoppingList({ items, onToggle, onToggleCategory }: ShoppingListProps) {
  const categories = groupByCategory(items)
  const total = items.length
  const checkedCount = items.filter((i) => i.checked).length

  return (
    <div className="flex flex-col flex-1">
      <div className="mb-4 flex items-center justify-between text-sm text-charcoal/70">
        <span>
          {checkedCount} of {total} checked
        </span>
      </div>
      <div className="space-y-6">
        {categories.map((cat) => {
          const allChecked = cat.items.every((i) => i.checked)
          return (
            <div key={cat.id} className="rounded-xl border border-warm-border bg-warm-surface/50 p-4 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-charcoal">{cat.label}</h2>
                {onToggleCategory && (
                  <button
                    type="button"
                    onClick={() => onToggleCategory(cat.id, !allChecked)}
                    className="text-sm text-accent hover:underline"
                  >
                    {allChecked ? 'Deselect all' : 'Select all'}
                  </button>
                )}
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => onToggle(item.id, e.target.checked)}
                      className="w-5 h-5 rounded border-warm-border text-accent focus:ring-accent"
                    />
                    <label
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer select-none ${
                        item.checked ? 'line-through text-charcoal/50' : 'text-charcoal'
                      }`}
                    >
                      {item.name}
                    </label>
                    <span className={`text-sm tabular-nums ${item.checked ? 'text-charcoal/50' : 'text-charcoal/70'}`}>
                      {formatQuantity(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
