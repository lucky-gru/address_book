import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { PropsValue } from 'react-select'
import Button from '../../Button'
import { Address, AddressListItem } from '../../../types'
import AddressSearch from '../AddressSearch'
import { addressFormValidate, isEqaulAddress } from '../../../utils'
import { Form, FormGroup } from '../../Form'
import { CountryOption } from '../../../types'
import AddressForm from '../AddressForm'

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

function AddressRegister({
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
        <AddressForm
          country={country}
          handleCountry={handleCountry}
          exist={exist}
          state={state}
          error={error}
          handleChange={handleChange}
        />
      ) : (
        <Form>
          <FormGroup>
            <label>Search:</label>
            <AddressSearch />
          </FormGroup>
        </Form>
      )}
      <div className="addres-book__button-wrap">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AddressRegister
