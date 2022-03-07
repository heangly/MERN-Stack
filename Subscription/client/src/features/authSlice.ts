import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { WritableDraft } from 'immer/dist/internal'
import { ReactText } from 'react'
import { Auth, LocalStorageUser, loginUser, registerUser } from './authActions'

interface IInitialState {
  user: { email: string; token: string }
  isLoading: boolean
  isError: boolean
  message: string
}

export interface IUserData {
  email: string
  password: string
}

export interface IAuthSuccessReturnData {
  email: string
  token: string
}

const userInLocalStorage = JSON.parse(
  localStorage.getItem(LocalStorageUser.user)!
)

const initialState: IInitialState = {
  user: userInLocalStorage ?? { email: '', token: '' },
  isLoading: false,
  isError: false,
  message: ''
}

let toastId: ReactText

export const authSlice = createSlice({
  name: Auth.Auth,
  initialState,
  reducers: {
    resetAuth: (state) => {
      updateReducers(state, false, false, '', { email: '', token: '' })
      localStorage.removeItem(LocalStorageUser.user)
      toast.dismiss()
      toast.success('Logout Successfully!')
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        updateReducers(state, true, false, '', { email: '', token: '' })
        toast.dismiss()
        toastId = toast.loading('Laoding...')
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IAuthSuccessReturnData>) => {
          updateReducers(state, false, false, '', { ...action.payload })
          toast.dismiss(toastId)
          toast.success('Register Success')
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        const message = action.payload as string
        updateReducers(state, false, true, message, { email: '', token: '' })
        toast.dismiss(toastId)
        toast.error(message)
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        updateReducers(state, true, false, '', { email: '', token: '' })
        toast.dismiss()
        toastId = toast.loading('Loading..')
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IAuthSuccessReturnData>) => {
          updateReducers(state, false, false, '', { ...action.payload })
          toast.dismiss(toastId)
          toast.success('Login Success')
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        const message = action.payload as string
        updateReducers(state, false, true, message, { email: '', token: '' })
        toast.dismiss(toastId)
        toast.error(state.message)
      })
  }
})

const updateReducers = (
  state: WritableDraft<IInitialState>,
  isLoading: boolean,
  isError: boolean,
  message: string,
  user: IAuthSuccessReturnData
) => {
  state.isLoading = isLoading
  state.isError = isError
  state.message = message
  state.user = user
}

export const { resetAuth } = authSlice.actions
export default authSlice.reducer
