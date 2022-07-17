import { useState } from 'react'
import './style.css'
import AddressItem from '../../components/AddressItem'
import Button from '../../components/Button'
import { Address } from '../../types'

function AddressBook() {
  const [list, setList] = useState<Address[]>([
    {
      line1: 'New York street',
      postcode: '2342',
      town: 'New York',
      country: 'US',
    },
  ])
  const [selected, setSelected] = useState<string>('')

  return (
    <div className="container address-book">
      <div className="address-book__list">
        {list.map((item: Address) => (
          <AddressItem
            key={item.postcode}
            {...item}
            onClick={() => {
              if (item.postcode === selected) {
                setSelected('')
              } else {
                setSelected(item.postcode)
              }
            }}
            selected={item.postcode === selected ? true : false}
          />
        ))}
        <div className="addres-book__button-wrap">
          {list.length > 0 && <Button>Select</Button>}
        </div>
      </div>
      <div className="address-book__form"></div>
    </div>
  )
}

export default AddressBook
