import React, { Component } from 'react'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header/header.component'
import Message from './components/message/message.component';
import CryptoListPage from './pages/presentation-page/crypto-list/crypto.list.page';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.page';
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.pageDataRED.isLoggedIn,
  }
}


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Message />
        <Switch>
          <Route exact path='/' component={CryptoListPage} />
          <Route exact path='/signin' render={() =>
            this.props.isLoggedIn ?
              (<Redirect to='/' />)
              :
              (<SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    )
  }
}


export default connect(mapStateToProps, null)(App);
