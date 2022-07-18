import { useMemo } from 'react'
import Select, { PropsValue, StylesConfig } from 'react-select'
import countryList from 'react-select-country-list'
import { CountryOption } from '../../types'

const customStyles: StylesConfig<string, false, any> = {
  control: (provided) => ({
    ...provided,
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
