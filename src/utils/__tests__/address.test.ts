import { Address, AddressListItem } from '../../types'
import { isEqaulAddress } from '../address'

test('Compare two Addresses with the same values', () => {
  const addr1: Address = {
    line1: '1726-1716 Botham Jean Blvd Dallas, TX',
    line2: '',
    line3: '',
    postcode: '1726-1716',
    town: 'Dallas',
    country: 'US',
  }

  const addressLineItem: AddressListItem = {
    ...addr1,
    id: 'random id',
  }

  expect(isEqaulAddress(addressLineItem, addr1)).toBe(true)
})

test('Compare tow Addresses with different values', () => {
  const addr1: Address = {
    line1: '1726-1716 Botham Jean Blvd Dallas, TX',
    line2: '',
    line3: '',
    postcode: '1726-1716',
    town: 'Dallas',
    country: 'US',
  }

  const addressLineItem: AddressListItem = {
    ...addr1,
    line1: 'Another address',
    id: 'random id',
  }

  expect(isEqaulAddress(addressLineItem, addr1)).toBe(false)
})
