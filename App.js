import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import Firebase from "./services/Firebase.js";
import { AppDrawerNavigator } from './app/components/RootNavigator';
import AuthStackNavigator from './app/components/AuthStackNavigator';

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
                {(this.state.isAuthenticated) ? <AppDrawerNavigator/> : <AuthStackNavigator/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#336699',
    },
})