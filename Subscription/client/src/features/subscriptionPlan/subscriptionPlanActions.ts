import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum SubscriptionPlan {
  SubscriptionPlan = 'subscriptionPlan',
  Price = 'subscriptionPlan/price'
}

enum BaseUrl {
  price = '/api/subs/prices'
}

export const getPlanPrice = createAsyncThunk(
  SubscriptionPlan.Price,
  async (token: string, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get(BaseUrl.price, config)
      return data.data
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
