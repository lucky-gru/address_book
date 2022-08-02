import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './style.css'
import AddressItem from '../../components/AddressItem'
import AddressRegister from '../../components/App/AddressRegister'
import Button from '../../components/Button'
import { Address, AddressListItem } from '../../types'

function AddressBook() {
  const [list, setList] = useState<AddressListItem[]>([])
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

  const handleSelect = () => {
    alert(`Do you like it?`)
  }

  return (
    <div className="container address-book">
      <div className="address-book__list">
        <div className="address-book__list__title">Address Book</div>
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
        {list.length === 0 && (
          <div className="address-book__list__description">
            <p>There aren't addreses booked.</p>
            <p>You can add new addresses in the right box</p>
          </div>
        )}
        <div className="addres-book__button-wrap">
          {list.length > 0 && <Button onClick={handleSelect}>Select</Button>}
        </div>
      </div>
      <div className="address-book__form">
        <AddressRegister submit={add} list={list} />
      </div>
    </div>
  )
}

export default AddressBook
