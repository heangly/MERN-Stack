import axios from 'axios'
import { IUserData } from './authSlice'

const SIGNIN_URL = '/api/auth/signin'
const SIGNUP_URL = '/api/auth/signup'

const auth = async (api: string, userData: IUserData) => {
  const { data } = await axios.post(api, userData)
  if (data) {
    localStorage.setItem('subscriptionUser', JSON.stringify(data))
  }
  return data
}

const register = async (userData: IUserData) => {
  return await auth(SIGNUP_URL, userData)
}

const login = async (userData: IUserData) => {
  return await auth(SIGNIN_URL, userData)
}

const authServices = { register, login }

export default authServices
