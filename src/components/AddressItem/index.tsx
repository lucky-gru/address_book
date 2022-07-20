import styled from 'styled-components'
import { Address } from '../../types'

const AddressFormWrap = styled.div<{ selected: boolean }>`
  border-bottom: 1px solid #e6e4d0;
  padding-top: 12px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#ceca9b' : 'transparent')};
  text-align: left;

  &:hover {
    background: #ceca9b;
  }

  h5 {
    margin: 4px;
    padding: 0px;
    font-size: 1rem;
    font-weight: 300;
  }
`

function AddressItem({
  line1,
  line2,
  line3,
  postcode,
  town,
  country,
  selected,
  onClick,
}: Address & { selected: boolean; onClick: () => void }) {
  return (
    <AddressFormWrap
      data-testid="addressItem"
      selected={selected ? true : false}
      onClick={onClick}
    >
      <h5 data-testid="line1">Address Line 1 : {line1}</h5>
      <h5 data-testid="line2">{line2 ? `Address Line 2 ${line2} :` : ''}</h5>
      <h5 data-testid="line3">{line3 ? `Address Line 3 ${line3} :` : ''}</h5>
      <h5>
        <span data-testid="postcode">{postcode}</span>&nbsp;
        <span data-testid="town">{town}</span>&nbsp;
        <span data-testid="country">{country}</span>
      </h5>
    </AddressFormWrap>
  )
}

export default AddressItem
