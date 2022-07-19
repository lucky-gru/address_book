export type Address = {
  line1: string
  line2?: string
  line3?: string
  town: string
  postcode: string
  country: string
}

export type AddressListItem = Address & { id: string }

export type CountryOption = {
  label: string
  value: string
}

export enum Mode {
  API,
  MANUAL,
}