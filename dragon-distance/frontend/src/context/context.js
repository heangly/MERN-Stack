import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState({ name: '', address: '' })
  return (
    <AppContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
