import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Button from '../index'

test('Button render', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('background', '#ff4c50')
  expect(tree).toHaveStyleRule('color', '#fff')
})
