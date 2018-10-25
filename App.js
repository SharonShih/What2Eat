
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

//import RegForm from "./app/components/RegForm.js";
//import Profile from "./app/components/Profile.js";
import MainPage from "./app/components/MainPage.js";
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <View style = {styles.container}>
            <MainPage />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336699',
  },




});
