import type { BookRepositoryInterface, Result, BookItem, Params } from './types'
import { httpClient } from '../httpClient'

export class BookRepository implements BookRepositoryInterface {
  async get(params: Params): Promise<Result> {
    const { data } = await httpClient.get<Result>('/', { params })
    return data
  }
  async find(id: string): Promise<BookItem> {
    const { data } = await httpClient.get<BookItem>(`/${id}`)
    return data
  }
}
