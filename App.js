
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Firebase from "./services/Firebase.js";

import SignInForm from "./app/scenes/SignInForm";
import Home from "./app/scenes/Home";
import RegForm from "./app/scenes/RegForm";
import ForgetPassForm from "./app/scenes/ForgetPassForm";
import Profile from "./app/components/Profile";

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = ({
            isAuthenticationReady: false,
            isAuthenticated: false,
        });
        //Firebase;
        Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({isAuthenticationReady: true});
        this.setState({isAuthenticated: !!user});
    }

    render() {
        return (
            <View style = { styles.container }>
                {(this.state.isAuthenticated) ? <Home /> : <AuthStackNavigator />}
            </View>
        );
    }
}


const AuthStackNavigator = createStackNavigator ({
    SignInForm: { screen: SignInForm },
    RegForm: { screen: RegForm },
    Home: { screen: Home },
    ForgetPassForm: { screen: ForgetPassForm },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#336699',
    },
})
