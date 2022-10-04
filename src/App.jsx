import React,{useState} from 'react'
import { MyContextProvider } from './Context/context'
import MainRoutes from './Routes/Routes'

function App() {
  return (
    <MyContextProvider>
      <MainRoutes />
    </MyContextProvider>
  )
}

export default App