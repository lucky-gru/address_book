import styled from 'styled-components'
import { Address } from '../../types'

const AddressFormWrap = styled.div<{ selected: boolean }>`
  border-bottom: 1px solid #e6e4d0;
  margin-top: 8px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#ceca9b' : 'transparent')};

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
    <AddressFormWrap selected={selected ? true : false} onClick={onClick}>
      <h5>{line1}</h5>
      <h5>{line2 ? line2 : ''}</h5>
      <h5>{line3 ? line3 : ''}</h5>
      <h5>
        <span>{postcode}</span>&nbsp;<span>{town}</span>&nbsp;
        <span>{country}</span>
      </h5>
    </AddressFormWrap>
  )
}

export default AddressItem
