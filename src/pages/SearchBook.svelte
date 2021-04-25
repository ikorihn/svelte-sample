<script>
  import SearchBar from '../components/SearchBar.svelte'

  let q = 'Svelte'
</script>

<form>
  <SearchBar bind:value={q} />
</form>
