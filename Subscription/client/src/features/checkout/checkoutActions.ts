import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum Checkout {
  Checkout = 'checkout/pay',
  Payment = 'checkout/payment'
}

enum BaseUrl {
  checkout = '/api/subs/session'
}

export const checkoutPayment = createAsyncThunk(
  Checkout.Payment,
  async (info: { priceId: string; token: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${info.token}`
        }
      }
      const { data } = await axios.post(
        BaseUrl.checkout,
        { priceId: info.priceId },
        config
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? error.message ?? error.toString()
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)
