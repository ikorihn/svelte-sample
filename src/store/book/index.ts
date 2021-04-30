import type { BookItem } from '../../repositories/book'
import { writable } from 'svelte/store'

export const books = writable<BookItem[]>([])
