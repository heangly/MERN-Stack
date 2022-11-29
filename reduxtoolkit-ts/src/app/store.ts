import { configureStore } from '@reduxjs/toolkit'
import customerSlice from '../features/customerSlice'
import reservationReducer from '../features/reservationSlice'

export const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    customers: customerSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
