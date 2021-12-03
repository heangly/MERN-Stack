import React from 'react'
import ReactDOM from 'react-dom'
import { AppProvider } from './context/context'
import App from './App'
import './styles/index.css'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.querySelector('#root')
)
