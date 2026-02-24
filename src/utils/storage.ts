import type { SavedListEntry } from '../types'

const STORAGE_KEY = 'bbq-lists'

export function getSavedLists(): SavedListEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedListEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveList(entry: Omit<SavedListEntry, 'id'>): SavedListEntry {
  const lists = getSavedLists()
  const id = `bbq-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const newEntry: SavedListEntry = { ...entry, id }
  lists.unshift(newEntry)
  // Keep last 50
  const trimmed = lists.slice(0, 50)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  return newEntry
}

export function getSavedListById(id: string): SavedListEntry | null {
  return getSavedLists().find((l) => l.id === id) ?? null
}

export function deleteSavedList(id: string): void {
  const lists = getSavedLists().filter((l) => l.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
}
