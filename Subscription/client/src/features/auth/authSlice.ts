import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { WritableDraft } from 'immer/dist/internal'
import { ReactText } from 'react'
import { Auth, LocalStorageUser, loginUser, registerUser } from './authActions'

interface IInitialState {
  isLoading: boolean
  isError: boolean
  message: string
  user: { token: string }
}

export interface IUserData {
  email: string
  password: string
}

export interface IAuthSuccessReturnData {
  token: string
}

const initialUser = { token: '' }

const userInLocalStorage = JSON.parse(
  localStorage.getItem(LocalStorageUser.user)!
)

const initialState: IInitialState = {
  user: userInLocalStorage ?? initialUser,
  isLoading: false,
  isError: false,
  message: ''
}

let toastId: ReactText

const authSlice = createSlice({
  name: Auth.Auth,
  initialState,
  reducers: {
    resetAuth: (state) => {
      updateReducers(state, false, false, '', initialUser)
      localStorage.removeItem(LocalStorageUser.user)
      toast.dismiss()
      toast.success('Logout Successfully!')
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
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
        updateReducers(state, false, true, message, initialUser)
        toast.dismiss(toastId)
        toast.error(message)
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        updateReducers(state, true, false, '', initialUser)
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
        updateReducers(state, false, true, message, initialUser)
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
