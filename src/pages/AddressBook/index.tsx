import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './style.css'
import AddressItem from '../../components/AddressItem'
import AddressForm from '../../components/App/AddressForm'
import Button from '../../components/Button'
import { Address } from '../../types'

type AddressListItem = Address & { id: string };

function AddressBook() {
  const [list, setList] = useState<AddressListItem[]>([
    {
      id: uuidv4(),
      line1: 'New York street',
      postcode: '2342',
      town: 'New York',
      country: 'US',
    },
  ])
  const [selected, setSelected] = useState<string>('')

  const add = (newAddress: Address) => {
    setList((prev) => [
      ...prev,
      {
        ...newAddress,
        id: uuidv4(),
      },
    ])
  }

  return (
    <div className="container address-book">
      <div className="address-book__list">
        {list.map((item: AddressListItem) => (
          <AddressItem
            key={item.id}
            {...item}
            onClick={() => {
              if (item.id === selected) {
                setSelected('')
              } else {
                setSelected(item.id)
              }
            }}
            selected={item.id === selected ? true : false}
          />
        ))}
        <div className="addres-book__button-wrap">
          {list.length > 0 && <Button>Select</Button>}
        </div>
      </div>
      <div className="address-book__form">
        <AddressForm submit={add} />
      </div>
    </div>
  )
}

export default AddressBook
