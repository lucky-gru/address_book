const api = process.env.REACT_APP_API

export const getAddress = (search: string): Promise<any> => {
  return fetch(`${api}/address/find/${search}`)
}
