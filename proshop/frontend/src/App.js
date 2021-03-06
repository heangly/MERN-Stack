import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screen/HomeScreen'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './components/PaymentScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/profile' component={ProfileScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceOrderScreen} />
            <Route exact path='/order/:id' component={OrderScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
