import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SingInAndSingUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'
//import { auth ,createUserProfileDocument } from "./assets/firebase/firebase.utils";
//import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSesion } from './redux/user/user.action';

const App = ({ checkUserSession,currentUser }) => {

  useEffect(() => {
    checkUserSession();
  },[checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SingInAndSingUpPage />)} />

      </Switch>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSesion())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
