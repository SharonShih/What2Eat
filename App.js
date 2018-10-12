
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import RegForm from "./app/scenes/RegForm.js";
import firebase from "./services/firebase.js";

type Props = {};
export default class App extends Component<Props> {
  // componentWillMount() {
  //     const firebaseApp = firebase.initializeApp(firebase.firebaseConfig);
  // }

  render() {
    return (
        <View style = {styles.container}>
          <RegForm />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12c2e9',
    paddingLeft: 60,
    paddingRight: 60,
  },
});
