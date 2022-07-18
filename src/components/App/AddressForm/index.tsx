import React, { useState, useRef, useEffect, BaseSyntheticEvent } from 'react'
import styled from 'styled-components'
import { PropsValue } from 'react-select'
import CountrySelector from '../../CountrySelector'
import Button from '../../Button'
import { Address, AddressListItem } from '../../../types'
import { CountryOption } from '../../../types'
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg'
import { addressFormValidate, isEqaulAddress } from '../../../utils'

enum Mode {
  API,
  MANUAL,
}

const ButtonGroup = styled.div`
  display: inline-flex;
  border-radius: 4px;
`

const ButtonGrouped = styled.button<{ selected: boolean }>`
  min-width: 40px;
  box-shadow: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  color: #fff;
  background-color: ${(props) => (props.selected ? '#ff4c50' : '#d89495')};

  &:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 1px solid #bdbdbd;
    border-color: #d89495;
  }

  &:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const Form = styled.div`
  margin-top: 24px;
`
const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  & label {
    font-size: 1rem;
    font-family: 'Gotham';
    font-weight: 500;
    display: block;
    margin: 0 0 5px 15px;
  }

  & > input[type='text'] {
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding: 0 12px;
    border-radius: 21px;
    display: block;
    background: #fff;
    border: 1px solid #c8c8c8;
    font-size: 1rem;
    font-family: 'Gotham';
    font-weight: 500;
    color: #343a40;
  }

  & > span {
    margin: 5px 0 0 10px;
    display: inline-block;
    padding: 5px;
    border: 1px solid #ff4c50;
    color: #ff4c50;
    font-size: 1rem;
  }
`

const Error = styled.span`
  margin: 15px 0 0 10px;
  display: inline-block;
  padding: 5px;
  border: 1px solid #ff4c50;
  color: #ff4c50;
  font-size: 1rem;
`

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

function AddressForm({
  submit,
  list,
}: {
  submit: (newAddress: Address) => void
  list: AddressListItem[]
}) {
  const [mode, setMode] = useState<Mode>(Mode.MANUAL)

  const initialValue = {
    line1: '',
    postcode: '',
    town: '',
    country: '',
  }

  const [state, setState] = useState<Address>(initialValue)

  const [error, setError] = useState<Address>({
    line1: '',
    postcode: '',
    town: '',
    country: '',
  })

  const searchRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const [country, setCountry] = useState<
    PropsValue<CountryOption> | undefined
  >()

  const [exist, setExist] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')

  const handleChange = (event: React.BaseSyntheticEvent) => {
    event.persist()
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
    setExist(false)
    setError((prev) => ({
      ...prev,
      [event.target.name]: false,
    }))
  }

  const handleCountry = (newValue: any) => {
    setState((prev) => ({ ...prev, country: newValue.label }))
    setCountry(newValue)
    setError((prev) => ({ ...prev, country: '' }))
  }

  const handleSubmit = () => {
    const { valid, error } = addressFormValidate(state)
    if (valid) {
      const exist = list.find((item: AddressListItem) => {
        if (isEqaulAddress(item, { ...state, line2: '', line3: '' }))
          return true
        return false
      })
      if (exist) {
        setExist(true)
        return
      }
      submit(state)
      setState(initialValue)
      setCountry({ label: '', value: '' })
    } else {
      setError(error)
    }
  }

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
  }, [isMenuOpen])

  const handleSearch = (event: BaseSyntheticEvent) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <ButtonGroup>
        <ButtonGrouped
          selected={mode === Mode.MANUAL ? true : false}
          onClick={() => {
            setMode(Mode.MANUAL)
          }}
        >
          MANUAL
        </ButtonGrouped>
        <ButtonGrouped
          selected={mode === Mode.API ? true : false}
          onClick={() => {
            setMode(Mode.API)
          }}
        >
          API
        </ButtonGrouped>
      </ButtonGroup>
      {mode === Mode.MANUAL ? (
        <Form>
          <FormGroup>
            <label>Address Line1:</label>
            <input
              type="text"
              value={state.line1}
              name="line1"
              onChange={handleChange}
            />
            {error.line1 && <span>{error.line1}</span>}
          </FormGroup>
          <FormGroup>
            <label>Postcode:</label>
            <input
              type="text"
              value={state.postcode}
              name="postcode"
              onChange={handleChange}
            />
            {error.postcode && <span>{error.postcode}</span>}
          </FormGroup>
          <FormGroup>
            <label>Town:</label>
            <input
              type="text"
              value={state.town}
              name="town"
              onChange={handleChange}
            />
            {error.town && <span>{error.town}</span>}
          </FormGroup>
          <FormGroup>
            <label>Country:</label>
            <CountrySelector country={country} setCountry={handleCountry} />
            {error.country && <span>{error.country}</span>}
          </FormGroup>
          {exist && <Error>The address exist already!</Error>}
        </Form>
      ) : (
        <Form>
          <FormGroup>
            <label>Search:</label>
            <SearchWithAutoSuggestion ref={searchRef}>
              <Search>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  autoComplete="off"
                />
                <span>
                  <SearchIcon />
                </span>
              </Search>
              {isMenuOpen && (
                <SuggestionWrap>
                  <div>am okay</div>
                  <div>am okay</div>
                </SuggestionWrap>
              )}
            </SearchWithAutoSuggestion>
          </FormGroup>
        </Form>
      )}
      <div className="addres-book__button-wrap">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AddressForm
