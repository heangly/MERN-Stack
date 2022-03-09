import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { ReactText } from 'react'
import { toast } from 'react-toastify'
import { Checkout, checkoutPayment } from './checkoutActions'

interface InitialState {
  isLoading: boolean
  isError: boolean
  message: string
  result: { url: string }
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  message: '',
  result: { url: '' }
}

let toastId: ReactText

const checkoutSlice = createSlice({
  name: Checkout.Checkout,
  initialState,
  reducers: {
    resetCheckout: (state) => initialState
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      // Get Plan Price
      .addCase(checkoutPayment.pending, (state) => {
        updateCheckoutState(state, true, false, '', { url: '' })
        toast.dismiss(toastId)
        toastId = toast.loading('Loading...')
      })
      .addCase(checkoutPayment.fulfilled, (state, action) => {
        updateCheckoutState(state, false, false, '', action.payload)
        toast.dismiss(toastId)
      })
      .addCase(checkoutPayment.rejected, (state, action) => {
        updateCheckoutState(state, false, true, action.payload as string, {
          url: ''
        })
        toast.dismiss(toastId)
        toastId = toast.error(state.message)
      })
  }
})

const updateCheckoutState = (
  state: WritableDraft<InitialState>,
  isLoading: boolean,
  isError: boolean,
  message: string,
  result: { url: string }
) => {
  state.isLoading = isLoading
  state.isError = isError
  state.message = message
  state.result = result
}

export const { resetCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer
