import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App name', () => {
  render(<App />)
  expect(screen.getByText('Address Book')).toBeInTheDocument()
})
