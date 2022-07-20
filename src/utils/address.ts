import { Address, AddressListItem } from '../types'

export const isEqualAddress = (
  addr1: AddressListItem,
  addr2: Address,
): boolean => {
  const cloneAddr1 = { ...addr1 } as Address & { id?: string }
  delete cloneAddr1.id

  if (cloneAddr1.line2 === undefined) cloneAddr1.line2 = ''
  if (cloneAddr1.line3 === undefined) cloneAddr1.line3 = ''

  return JSON.stringify(cloneAddr1) === JSON.stringify(addr2)
}
