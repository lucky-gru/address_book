import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Form, FormGroup, Error } from '../index'

test('Form render', () => {
  const tree = renderer.create(<Form />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('margin-top', '24px')
})

test('FormGroup render', () => {
  const tree = renderer.create(<FormGroup />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('margin-bottom', '1rem')
})

test('Error render', () => {
  const tree = renderer.create(<Error>really error</Error>).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('color', '#ff4c50')
})
