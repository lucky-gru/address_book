import { useEffect, useRef, BaseSyntheticEvent } from 'react'
import styled from 'styled-components'
import SearchBox from '../SearchBox'
import AddressItem from '../AddressItem'

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
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d4aa70;
    border-radius: 100px;
  }
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
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <SearchWithAutoSuggestion ref={searchRef}>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        toggleMenu={toggleMenu}
      />
      {isMenuOpen && (
        <SuggestionWrap>
          {suggestions?.length > 0 &&
            suggestions.map((item, index) => (
              <AddressItem
                key={index}
                {...item}
                selected={false}
                onClick={() => {}}
              />
            ))}
        </SuggestionWrap>
      )}
    </SearchWithAutoSuggestion>
  )
}

export default AutoSearch
