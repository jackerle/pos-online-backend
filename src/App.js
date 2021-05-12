import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Signon from './screens/real/Signon';
import Sale from './screens/real/Sale';
import MainScreen from './screens/posonline/MainScreen';
import LoginScreen from './screens/posonline/LoginScreen';
import { colors } from '@material-ui/core';


const user_list = [
  {
    "username":"admin",
    "password":"12345678"
  }
  
]

const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"A7Font"`,
    "fontSize": 18,
  },
  palette: {
    primary: {
      main: '#438B63'
    },
    secondary: {
      main: '#F3F8FE'
    }
  },
});


const App = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [userInfo , setUserInfo] = useState(null)

  return (
    <div className='app'>
      <MuiThemeProvider theme={THEME}>
        <Switch>
          {/* <Route path='/sale' component={Sale}></Route> */}
          <Route path='/' >
            {
              (isLogin)?
              <MainScreen 
                userInfo={userInfo} 
                logout={()=>{
                  setUserInfo(null)
                  setIsLogin(false)}}/>:
              <LoginScreen 
                user_list={user_list} 
                setIsLogin={setIsLogin} 
                setUserInfo={setUserInfo}/>
              
            }
          </Route>
        </Switch>
      </MuiThemeProvider>
    </div>
  )

}

export default App;
