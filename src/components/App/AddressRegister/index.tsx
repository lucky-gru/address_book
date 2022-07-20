import React, { useState } from 'react'
import styled from 'styled-components'
import { PropsValue } from 'react-select'
import Button from '../../Button'
import { Address, AddressListItem } from '../../../types'
import AddressSearch from '../AddressSearch'
import { addressFormValidate, isEqualAddress } from '../../../utils'
import { Form, FormGroup } from '../../Form'
import { CountryOption, Mode } from '../../../types'
import AddressForm from '../AddressForm'

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
    line2: '',
    line3: '',
    postcode: '',
    town: '',
    country: '',
  }

  const [state, setState] = useState<Address>(initialValue)

  const [error, setError] = useState<Address>(initialValue)

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
    setExist(false)
    setError((prev) => ({ ...prev, country: '' }))
  }

  const handleSubmit = () => {
    const { valid, error } = addressFormValidate(state)
    if (valid) {
      const exist = list.find((item: AddressListItem) => {
        if (isEqualAddress(item, { ...state, line2: '', line3: '' }))
          return true
        return false
      })
      if (exist) {
        setExist(true)
        return
      }
      submit(state)
      setState(initialValue)
      setError(initialValue)
      setCountry({ label: '', value: '' })
    } else {
      setError(error)
    }
  }

  const selectSuggestion = (address: Address) => {
    setExist(false)
    setState(address)
    setError(initialValue)
  }

  const handleMode = (newMode: Mode) => () => {
    setMode(newMode)
    setExist(false)
    setError(initialValue)
    setState(initialValue)
  }

  return (
    <div>
      <ButtonGroup>
        <ButtonGrouped
          selected={mode === Mode.MANUAL ? true : false}
          onClick={handleMode(Mode.MANUAL)}
        >
          MANUAL
        </ButtonGrouped>
        <ButtonGrouped
          selected={mode === Mode.API ? true : false}
          onClick={handleMode(Mode.API)}
        >
          API
        </ButtonGrouped>
      </ButtonGroup>
      <Form>
        {mode === Mode.API && (
          <FormGroup>
            <label>Search:</label>
            <AddressSearch selectSuggestion={selectSuggestion} />
          </FormGroup>
        )}
        {(mode === Mode.MANUAL || state.postcode) && (
          <AddressForm
            mode={mode}
            country={country}
            handleCountry={handleCountry}
            exist={exist}
            state={state}
            error={error}
            handleChange={handleChange}
          />
        )}
      </Form>
      <div className="addres-book__button-wrap">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AddressRegister
