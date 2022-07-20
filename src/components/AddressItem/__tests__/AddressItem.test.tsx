import { render, fireEvent, screen } from '@testing-library/react'
import AddressItem from '..'
//test block

describe('Test AddressItem Component', () => {
  it('Render required properties', () => {
    // render the component on virtual dom

    const mockOnClick = jest.fn()

    const props = {
      line1: '1726-1716 Botham Jean Blvd Dallas, TX',
      line2: '',
      line3: '',
      postcode: '1726-1716',
      town: 'Dallas',
      country: 'US',
      selected: false,
      onClick: mockOnClick,
    }

    render(<AddressItem {...props} />)

    const addressItem = screen.getByTestId('addressItem')

    const line1 = screen.getByTestId('line1')
    const postcode = screen.getByTestId('postcode')
    const town = screen.getByTestId('town')
    const country = screen.getByTestId('country')

    expect(line1).toHaveTextContent(`Address Line 1 : ${props.line1}`)
    expect(postcode).toHaveTextContent(props.postcode)
    expect(town).toHaveTextContent(props.town)
    expect(country).toHaveTextContent(props.country)

    fireEvent.click(addressItem)
    expect(mockOnClick.mock.calls.length).toEqual(1)
  })

  it('onClick function is binded correctly', () => {
    // render the component on virtual dom

    const mockOnClick = jest.fn()

    const props = {
      line1: '1726-1716 Botham Jean Blvd Dallas, TX',
      line2: '',
      line3: '',
      postcode: '1726-1716',
      town: 'Dallas',
      country: 'US',
      selected: false,
      onClick: mockOnClick,
    }

    render(<AddressItem {...props} />)

    const addressItem = screen.getByTestId('addressItem')

    fireEvent.click(addressItem)
    expect(mockOnClick.mock.calls.length).toEqual(1)
  })
})
