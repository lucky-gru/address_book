import { Form, FormGroup, Error } from '../../Form'
import { Address } from '../../../types'
import CountrySelector from '../../CountrySelector'
import { CountryOption } from '../../../types'
import { PropsValue } from 'react-select'

const AddressForm = ({
  state,
  error,
  country,
  handleChange,
  handleCountry,
  exist
}: {
    state: Address
    error: Address
    handleChange: (event: React.BaseSyntheticEvent) => void
    country: PropsValue<CountryOption> | undefined,
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
  )
}

export default AddressForm