import type { BookItem } from '../../repositories/book'
import { writable } from 'svelte/store'

export const useBookStore = () => {
  const { set, update, subscribe } = writable<BookItem[]>([])
  const reset = () => set([])
  const add = (newBooks: BookItem[]) =>
    update((books: BookItem[]) => {
      return [...books, ...newBooks]
    })

  return {
    subscribe,
    reset,
    add,
  }
}

export const books = useBookStore()
