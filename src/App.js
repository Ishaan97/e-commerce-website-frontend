import React from 'react';
import {Switch, Route} from 'react-router-dom'

import {connect} from "react-redux"

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignIn from "./pages/sign-in/sign-in.component"
import Register from "./pages/register/register.component"

import {setCurrentUser} from "./redux/user/user.actions"

import {auth, createUserProfileDocument} from "./firebase/firebase.utils"


import './App.css';




class App extends React.Component {
  
  unsubscribeFromAuth = null;
  
  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
          })
        });
      }else{
      
        setCurrentUser(userAuth)
      }
      
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

   
  render(){
    return (
      <div className="body">
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
