import { useMemo } from 'react'
import Select, {
  CSSObjectWithLabel,
  PropsValue,
  StylesConfig,
} from 'react-select'
import countryList from 'react-select-country-list'
import { CountryOption } from '../../types'

const customStyles: StylesConfig<string, false, any> = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontFamily: ` -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    borderRadius: '21px',
    height: '42px',
  }),
}

function CountrySelector({
  country,
  setCountry,
}: {
  country: PropsValue<CountryOption> | undefined
  setCountry: (newValue: PropsValue<CountryOption>) => void
}) {
  const options: any[] = useMemo(() => countryList().getData(), [])

  const changeHandler = (newValue: PropsValue<CountryOption>) => {
    setCountry(newValue)
  }

  return (
    <Select
      styles={customStyles}
      options={options}
      value={country as any}
      onChange={changeHandler}
    />
  )
}

export default CountrySelector
