const api = process.env.REACT_APP_API

export const getAddress = (search: string) => {
  return fetch(`${api}/address/find/${search}`)
}
