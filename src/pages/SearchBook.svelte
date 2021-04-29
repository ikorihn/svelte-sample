<script lang="ts">
  import BookCard from '../components/BookCard.svelte'
  import SearchBar from '../components/SearchBar.svelte'
  import type { BookItem } from '../repositories/book'
  import RepositoryFactory, { BOOK } from '../repositories/RepositoryFactory'
  import InfiniteScroll from 'svelte-infinite-scroll'

  const BookRepository = RepositoryFactory[BOOK]

  let q = 'Svelte'
  let empty = true
  let books: BookItem[]
  let promise: Promise<void>
  let startIndex = 0

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getBooks()
  }

  const getBooks = async () => {
    books = []
    empty = false
    const result = await BookRepository.get({ q })
    empty = result.totalItems === 0
    books = result.items
  }

  const handleLoadMore = () => {
    startIndex += 10
  }

  const getNextBooks = async () => {
    const result = await BookRepository.get({ q, startIndex })

    const bookIds = books.map((book) => book.id)
    const filteredItems = result.items.filter(
      (item) => !bookIds.includes(item.id)
    )
    books = [...books, filteredItems]
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SearchBar bind:value={q} />
</form>

<div class="text-center mt-4">
  {#if empty}
    <div>検索結果が見つかりません</div>
  {:else}
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {#each books as book (book.id)}
        <BookCard {book} />
      {/each}
    </div>
    <InfiniteScroll window on:loadMore={handleLoadMore} />
  {/if}

  {#await promise}
    <div>loading...</div>
  {:catch e}
    <span class="text-red-600 text-sm">
      {e.message}
    </span>
  {/await}
</div>
