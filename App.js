
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator,} from 'react-native';

import  Firebase from "./services/Firebase.js";
import * as firebase from 'firebase';

import RegForm from "./app/scenes/RegForm.js";

type Props = {};
export default class App extends Component<Props> {

    constructor(Props) {
        super(Props);
        this.state = {
            isLoadingComplete: false,
        };

        if (!firebase.app.length) { firebase.initializeApp(Firebase.config); }
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
