import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

enum BaseUrl {
  SignUp = '/api/auth/signup',
  SignIn = '/api/auth/signin'
}

export enum LocalStorageUser {
  user = 'subscriptionUser'
}

export enum Auth {
  Auth = 'auth',
  Register = 'auth/register',
  Login = 'auth/login'
}

export interface IUserData {
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  Auth.Register,
  async (userData: IUserData, thunkAPI) => {
    try {
      return await auth(BaseUrl.SignUp, userData)
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

export const loginUser = createAsyncThunk(
  Auth.Login,
  async (userData: IUserData, thunkAPI) => {
    try {
      return await auth(BaseUrl.SignIn, userData)
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

const auth = async (api: string, userData: IUserData) => {
  const { data } = await axios.post(api, userData)
  if (data) {
    localStorage.setItem(LocalStorageUser.user, JSON.stringify(data))
  }
  return data
}
