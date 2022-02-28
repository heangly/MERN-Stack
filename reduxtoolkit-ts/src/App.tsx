import React, { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='reservation-container'>
          <div>
            <h5 className='reservation-header'>Reservations</h5>
            <div className='reservation-cards-container'></div>
          </div>
          <div className='reservation-input-container'>
            <input />
            <button>Add</button>
          </div>
        </div>
        <div className='customer-food-container'></div>
      </div>
    </div>
  )
}

export default App
