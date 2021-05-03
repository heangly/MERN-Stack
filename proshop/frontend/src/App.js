import React from 'react'
import Header from './components/Header'
import HomeScreen from './screen/HomeScreen'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-5'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
