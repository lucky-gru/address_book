import { PropsValue } from 'react-select'
import styled from 'styled-components'
import { Form, FormGroup, Error } from '../../Form'
import { Address } from '../../../types'
import CountrySelector from '../../CountrySelector'
import { CountryOption, Mode } from '../../../types'

const Country = styled.div`
  border: 1px solid #343a40;
  margin: 5px 0 0 10px;
  padding: 2px 5px;
  width: fit-content;
  color: #343a40;
  font-size: 18px;
`

const AddressForm = ({
  mode,
  state,
  error,
  country,
  handleChange,
  handleCountry,
  exist,
}: {
  mode: Mode
  state: Address
  error: Address
  handleChange: (event: React.BaseSyntheticEvent) => void
  country: PropsValue<CountryOption> | undefined
  handleCountry: (newValue: any) => void
  exist: boolean
}) => {
  return (
    <Form>
      <FormGroup>
        <label>Address Line1:</label>
        <input
          type="text"
          value={state.line1}
          name="line1"
          disabled={mode === Mode.API}
          onChange={handleChange}
        />
        {error.line1 && <span>{error.line1}</span>}
      </FormGroup>
      {mode === Mode.API && (
        <>
          <FormGroup>
            <label>Address Line2:</label>
            <input
              type="text"
              value={state.line2}
              name="line2"
              disabled={mode === Mode.API}
            />
          </FormGroup>
          <FormGroup>
            <label>Address Line3:</label>
            <input
              type="text"
              value={state.line3}
              name="line3"
              disabled={mode === Mode.API}
            />
          </FormGroup>
        </>
      )}
      <FormGroup>
        <label>Postcode:</label>
        <input
          type="text"
          value={state.postcode}
          name="postcode"
          onChange={handleChange}
          disabled={mode === Mode.API}
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
          disabled={mode === Mode.API}
        />
        {error.town && <span>{error.town}</span>}
      </FormGroup>
      <FormGroup>
        <label>Country:</label>
        {mode === Mode.API && state.country ? (
          <Country>{state.country}</Country>
        ) : (
          <CountrySelector country={country} setCountry={handleCountry} />
        )}
        {error.country && <span>{error.country}</span>}
      </FormGroup>
      {exist && <Error>The address exist already!</Error>}
    </Form>
  )
}

export default AddressForm
