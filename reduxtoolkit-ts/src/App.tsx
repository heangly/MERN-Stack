import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './app/store'
import './App.css'
import { ReservationCard } from './components/ReservationCard'
import { addReservation } from './features/reservationSlice'
import CustomerCard from './components/CustomerCard'

function App() {
  const [reservationName, setReservationName] = useState('')

  const dispatch = useDispatch()

  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  )

  const customers = useSelector((state: RootState) => state.customers.value)

  const reservationNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReservationName(e.target.value)
  }

  const reservationNameAddHandler = () => {
    if (!reservationName) return
    dispatch(addReservation(reservationName))
    setReservationName('')
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='reservation-container'>
          <div>
            <h5 className='reservation-header'>Reservations</h5>
            <div className='reservation-cards-container'>
              {reservations.map((name, index) => (
                <ReservationCard key={index} index={index} name={name} />
              ))}
            </div>
          </div>
          <div className='reservation-input-container'>
            <input
              value={reservationName}
              onChange={reservationNameChangeHandler}
            />
            <button onClick={reservationNameAddHandler}>Add</button>
          </div>
        </div>
        <div className='customer-food-container'>
          {customers.map((customer) => (
            <CustomerCard {...customer} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
