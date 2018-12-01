import React, {Component} from 'react';
import {createStackNavigator,} from 'react-navigation';

import MainPage from '../scenes/MainPage';
import SignInForm from "../scenes/auth/SignInForm";
import RegForm from "../scenes/auth/RegForm";
import Home from "../scenes/Home";
import ForgetPassForm from "../scenes/auth/ForgetPassForm";

const AuthStackNavigator = createStackNavigator({
  SignInForm: {screen: SignInForm},
  RegForm: {screen: RegForm},
  Home: {screen: Home},
  ForgetPassForm: {screen: ForgetPassForm},
  MainPage: {screen: MainPage},
})

export default AuthStackNavigator;