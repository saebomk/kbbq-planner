import type { ShoppingListItem } from '../types'

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

function formatQuantity(item: ShoppingListItem): string {
  const q = item.quantity
  const u = item.unit
  if (u === 'g' || u === 'ml') return `${q} ${u}`
  if (u === 'head' || u === 'bunch' || u === 'piece' || u === 'serving' || u === 'bottle' || u === 'can') return `${q} ${u}${q !== 1 ? 's' : ''}`
  if (u === 'leaves' || u === 'cloves') return `${q} ${u}`
  return `${q} ${u}`
}

function groupByCategory(items: ShoppingListItem[]): Map<string, ShoppingListItem[]> {
  const map = new Map<string, ShoppingListItem[]>()
  for (const item of items) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  return map
}

export function getListAsText(items: ShoppingListItem[], title = 'Korean BBQ Shopping List'): string {
  const lines: string[] = [title, '']
  const order = ['protein', 'veggies-ssam', 'veggies-grill', 'kimchi', 'sauces', 'staples', 'vegetarian', 'banchan', 'drinks', 'dessert']
  const map = groupByCategory(items)
  for (const catId of order) {
    const list = map.get(catId)
    if (!list?.length) continue
    lines.push(CATEGORY_LABELS[catId] ?? catId)
    for (const item of list) {
      lines.push(`  • ${item.name} — ${formatQuantity(item)}`)
    }
    lines.push('')
  }
  return lines.join('\n').trim()
}

export async function copyListToClipboard(items: ShoppingListItem[]): Promise<void> {
  const text = getListAsText(items)
  await navigator.clipboard.writeText(text)
}

export async function shareAsText(items: ShoppingListItem[]): Promise<boolean> {
  const text = getListAsText(items)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Korean BBQ Shopping List',
        text,
      })
      return true
    } catch {
      // fallback to clipboard
    }
  }
  await copyListToClipboard(items)
  return false
}

export async function captureListAsImage(element: HTMLElement): Promise<Blob> {
  const { toBlob } = await import('html-to-image')
  const blob = await toBlob(element, {
    backgroundColor: '#FAF9F7',
    pixelRatio: 2,
    cacheBust: true,
  })
  if (!blob) throw new Error('Failed to capture image')
  return blob
}

export function downloadBlobAsFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function shareAsImage(blob: Blob): Promise<boolean> {
  if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'bbq-list.png', { type: blob.type })] })) {
    try {
      await navigator.share({
        title: 'Korean BBQ Shopping List',
        files: [new File([blob], 'bbq-list.png', { type: blob.type })],
      })
      return true
    } catch {
      // fallback to download
    }
  }
  const date = new Date().toISOString().slice(0, 10)
  downloadBlobAsFile(blob, `korean-bbq-list-${date}.png`)
  return false
}
