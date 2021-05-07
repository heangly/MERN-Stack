import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialStates = {
  cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
