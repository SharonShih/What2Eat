import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import Firebase from "./services/Firebase.js";
import RootNavigator from './app/components/RootNavigator';
import AuthStackNavigator from './app/components/AuthStackNavigator';
import Home from './app/scenes/Home';

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
                {(this.state.isAuthenticated) ? <RootNavigator/> : <AuthStackNavigator/>}
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