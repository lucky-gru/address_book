import { BaseSyntheticEvent } from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'
const Search = styled.div`
  width: 100%;
  height: 42px;

  display: inline-flex;
  border-radius: 21px;
  background: #fff;
  border: 1px solid #c8c8c8;
  align-items: center;

  & input {
    height: 40px;
    border: none;
    width: 100%;
    display: inline-flex;
    outline: none;
    border-radius: 21px;
    padding-left: 21px;
    font-size: 1rem;
    font-family: 'Gotham';
    font-weight: 500;
    color: #343a40;
  }

  & span {
    display: inline-flex;
    margin-right: 10px;
  }
`

const SearchBox = ({
  search,
  handleSearch,
  toggleMenu,
}: {
  search: string
  handleSearch: (event: BaseSyntheticEvent) => void
  toggleMenu: () => void | undefined
}) => {
  const handleFocus = () => {
    if (toggleMenu) {
      toggleMenu()
    }
  }
  return (
    <Search>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        onFocus={handleFocus}
        autoComplete="off"
      />
      <span>
        <SearchIcon />
      </span>
    </Search>
  )
}

export default SearchBox
