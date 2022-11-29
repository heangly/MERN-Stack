import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { ReactText } from 'react'
import { toast } from 'react-toastify'
import { getPlanPrice, SubscriptionPlan } from './subscriptionPlanActions'

interface InitialState {
  isLoading: boolean
  isError: boolean
  message: string
  prices: any[]
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  message: '',
  prices: []
}

let toastId: ReactText

const subscriptionPlanSlice = createSlice({
  name: SubscriptionPlan.SubscriptionPlan,
  initialState,
  reducers: {
    resetPayment: () => initialState
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      // Get Plan Price
      .addCase(getPlanPrice.pending, (state) => {
        toast.dismiss(toastId)
        toastId = toast.loading('Loading...')
      })
      .addCase(getPlanPrice.fulfilled, (state, action) => {
        updatePaymentState(state, false, false, '', action.payload)
        toast.dismiss(toastId)
      })
      .addCase(getPlanPrice.rejected, (state, action) => {
        updatePaymentState(state, false, true, action.payload as string, [])
        toast.dismiss(toastId)
        toastId = toast.error(state.message)
      })
  }
})

const updatePaymentState = (
  state: WritableDraft<InitialState>,
  isLoading: boolean,
  isError: boolean,
  message: string,
  prices: any[]
) => {
  state.isLoading = isLoading
  state.isError = isError
  state.message = message
  state.prices = prices
}

export const { resetPayment } = subscriptionPlanSlice.actions
export default subscriptionPlanSlice.reducer
