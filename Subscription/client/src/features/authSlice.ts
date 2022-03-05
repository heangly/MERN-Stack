import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import authServices from './authServices'
import axios from 'axios'

interface IInitialState {
  user: { email: string; token: string }
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string
}

const initialState: IInitialState = {
  user: { email: '', token: '' },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export interface IUserData {
  email: string
  password: string
}

export interface IAuthSuccessReturnData {
  email: string
  token: string
}

enum Auth {
  Auth = 'auth',
  Register = 'auth/register',
  Login = 'auth/login'
}

export const registerUser = createAsyncThunk(
  Auth.Register,
  async (userData: IUserData, thunkAPI) => {
    try {
      return await authServices.register(userData)
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
      return await authServices.login(userData)
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

export const authSlice = createSlice({
  name: Auth.Auth,
  initialState,
  reducers: {
    reset: (state) => {
      state.user = { email: '', token: '' }
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.user = { email: '', token: '' }
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IAuthSuccessReturnData>) => {
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          state.message = ''
          state.user = { ...action.payload }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.user = { email: '', token: '' }
        state.message = action.payload as string
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.user = { email: '', token: '' }
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IAuthSuccessReturnData>) => {
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          state.message = ''
          state.user = { ...action.payload }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.user = { email: '', token: '' }
        state.message = action.payload as string
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
