import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFoodToCustomer } from '../features/customerSlice'

interface CustomerCardType {
  id: string
  name: string
  food: string[]
}

const CustomerCard = ({ id, name, food }: CustomerCardType) => {
  const [customerFoodInput, setCustomerFoodInput] = useState('')

  const dispatch = useDispatch()

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerFoodInput(event.target.value)
  }

  const clickHandler = () => {
    dispatch(
      addFoodToCustomer({
        id,
        food: customerFoodInput
      })
    )
    setCustomerFoodInput('')
  }

  return (
    <div className='customer-food-card-container'>
      <p>{name}</p>
      <div className='customer-foods-container'>
        <div className='customer-food'>
          {food.map((f) => (
            <p>{f}</p>
          ))}
        </div>
        <div className='customer-food-input-container'>
          <input
            value={customerFoodInput}
            type='text'
            onChange={inputHandler}
          />
          <button onClick={clickHandler}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default CustomerCard
