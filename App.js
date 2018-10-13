
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator,} from 'react-native';

import RegForm from "./app/scenes/RegForm.js";
import Firebase from "./services/Firebase.js";

type Props = {};
export default class App extends Component<Props> {
  // componentWillMount() {
  //     const firebaseApp = firebase.initializeApp(firebase.firebaseConfig);
  // }

    state = {
        authenticating: false,
    }

    renderCurrentState() {
	  if (this.state.authenticating) {
	      return (
	          <View>
                  <ActivityIndicator size='large'/>
              </View>
          );
      }

      return (
          <View>
              <RegForm />
          </View>
      );
    }

    render() {
      return (
          <View style = {styles.container}>
              {this.renderCurrentState()}
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
