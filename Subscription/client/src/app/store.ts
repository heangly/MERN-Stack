import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import subscriptionPlanReducer from '../features/subscriptionPlan/subscriptionPlanSlice'
import checkoutReducer from '../features/checkout/checkoutSlice'
import articleReducer from '../features/article/articleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptionPlan: subscriptionPlanReducer,
    checkout: checkoutReducer,
    articles: articleReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
