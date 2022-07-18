import { useState, BaseSyntheticEvent } from 'react'
import AutoSearch from '../../AutoSearch'

const AddressSearch = () => {
  const [search, setSearch] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const handleSearch = (event: BaseSyntheticEvent) => {
    setSearch(event.target.value)
  }

  return (
    <AutoSearch
      search={search}
      handleSearch={handleSearch}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      suggestions={suggestions}
    ></AutoSearch>
  )
}

export default AddressSearch;