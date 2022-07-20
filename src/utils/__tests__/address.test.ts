import { Address, AddressListItem } from '../../types'
import { isEqualAddress } from '../address'

describe('Test isEqualAddress function', () => {
  it('Compare two Addresses with the same values', () => {
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

    expect(isEqualAddress(addressLineItem, addr1)).toBe(true)
  })

  it('Compare tow Addresses with different values', () => {
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

    expect(isEqualAddress(addressLineItem, addr1)).toBe(false)
  })
})
