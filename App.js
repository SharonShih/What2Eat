import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation';
import Firebase from "./services/Firebase.js";
import SignInForm from "./app/scenes/auth/SignInForm";
import Home from "./app/scenes/Home";
import RegForm from "./app/scenes/auth/RegForm";
import ForgetPassForm from "./app/scenes/auth/ForgetPassForm";
import MainPage from "./app/components/MainPage";
import Profile from "./app/components/Profile";
import ChooseFavorite from './app/scenes/ChooseFavorite';
import Navigator from './app/components/Navigator'
import HistoryScreen from "./app/scenes/HistoryScreen";

export default class App extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = ({
            isAuthenticated: false,
        });
        Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({isAuthenticated: !!user});
    }

    render() {
        return (
            <View style={styles.container}>
                {(this.state.isAuthenticated) ? <Navigator/> : <AuthStackNavigator/>}
            </View>
        );
    }
}


const AuthStackNavigator = createStackNavigator({
    SignInForm: {screen: SignInForm},
    RegForm: {screen: RegForm},
    Home: {screen: Home},
    ForgetPassForm: {screen: ForgetPassForm},
    MainPage: {screen: MainPage},
})

const RootStackNavigator = createStackNavigator({
    MainPage: {screen: MainPage},
    Profile: {screen: Profile},
    ChooseFavorite: {screen: ChooseFavorite},
})
// const AppDrawerNavigator =createDrawerNavigator({
//     Profile: main,
//     History: HistoryScreen,
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#336699',
    },
})