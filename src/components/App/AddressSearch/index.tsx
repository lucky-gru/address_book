import { useState, useEffect, BaseSyntheticEvent } from 'react'
import AutoSearch from '../../AutoSearch'
import { useDebounce } from '../../../hooks'
import { getAddress } from '../../../services'
import { Address } from '../../../types'

const AddressSearch = ({
  selectSuggestion,
}: {
  selectSuggestion: (address: Address) => void
}) => {
  const [search, setSearch] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<Address[]>([])
  const debouncedSearchTerm = useDebounce(search, 500)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = (event: BaseSyntheticEvent) => {
    setSearch(event.target.value)
  }

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true)
        getAddress(debouncedSearchTerm)
          .then(async (response) => {
            const data = await response.json()
            if (data.status === 200) {
              setSuggestions(data.addresses)
              if (data.addresses.length > 0) {
                setIsMenuOpen(true)
              } else {
                setIsMenuOpen(false)
              }
            } else {
              setSuggestions([])
              setIsMenuOpen(false)
            }
            setLoading(false)
          })
          .catch(() => {
            setSuggestions([])
            setIsMenuOpen(false)
            setLoading(false)
          })
      } else {
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  )

  return (
    <AutoSearch
      search={search}
      handleSearch={handleSearch}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      suggestions={suggestions}
      selectSuggestion={selectSuggestion}
      placeholder="postcode: nn13er"
      loading={loading}
    ></AutoSearch>
  )
}

export default AddressSearch
