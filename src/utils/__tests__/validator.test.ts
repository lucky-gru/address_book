import { Address } from '../../types'
import { addressFormValidate } from '../validator'

test('Should return false if required field is undefined or empty string', () => {
  const addr1: Address = {
    line1: '',
    line2: '',
    line3: '',
    postcode: '',
    town: '',
    country: '',
  }

  const result = addressFormValidate(addr1)
  expect(result.valid).toBe(false)
  expect(result.error.line1).toBe('Line1 is required')
  expect(result.error.postcode).toBe('Postcode is required')
  expect(result.error.town).toBe('Town is required')
  expect(result.error.country).toBe('Country is required')
})

test('Should return true if required field is not undefined or empty', () => {
  const addr1: Address = {
    line1: '1726-1716 Botham Jean Blvd Dallas, TX',
    line2: '',
    line3: '',
    postcode: '1726-1716',
    town: 'Dallas',
    country: 'US',
  }

  const result = addressFormValidate(addr1)
  expect(result.valid).toBe(true)
  expect(result.error).toEqual({
    country: '',
    line1: '',
    postcode: '',
    town: '',
  })
})
