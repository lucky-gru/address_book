import { Address } from '../types'

export const addressFormValidate = (data: Address) => {
  const error: Address = {
    line1: '',
    postcode: '',
    town: '',
    country: '',
  }

  let valid = true
  if (!data.line1) {
    error.line1 = `Line1 is required`
    valid = false
  }
  if (!data.postcode) {
    error.postcode = `Postcode is required`
    valid = false
  }
  if (!data.town) {
    error.town = `Town is required`
    valid = false
  }
  if (!data.country) {
    error.country = `Country is required`
    valid = false
  }
  return { valid, error }
}
