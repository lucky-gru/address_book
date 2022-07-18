import { useEffect, useRef, BaseSyntheticEvent } from 'react'
import styled from 'styled-components'
import SearchBox from '../SearchBox'

const SearchWithAutoSuggestion = styled.div`
  width: 100%;
  display: block;
  position: relative;
`

const SuggestionWrap = styled.div`
  display: block;
  position: absolute;
  background: white;
  z-index: 10;
  width: 100%;
  border: 1px solid #e6e4d0;
  border-radius: 8px;
  padding: 10px;
`

const AutoSearch = ({
  search,
  handleSearch,
  suggestions,
  isMenuOpen,
  setIsMenuOpen,
}: {
  search: string
  handleSearch: (event: BaseSyntheticEvent) => void
  suggestions: any[]
  isMenuOpen: boolean
  setIsMenuOpen: (newValue: boolean) => void
}) => {
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isMenuOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node | null)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isMenuOpen, setIsMenuOpen])

  return (
    <SearchWithAutoSuggestion ref={searchRef}>
      <SearchBox search={search} handleSearch={handleSearch} />
      {isMenuOpen && (
        <SuggestionWrap>
          {suggestions?.length > 0 &&
            suggestions.map((item, index) => <div key={index}>ok</div>)}
        </SuggestionWrap>
      )}
    </SearchWithAutoSuggestion>
  )
}

export default AutoSearch
