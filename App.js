
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import RegForm from "./app/components/RegForm.js";

type Props = {};
export default class App extends Component<Props> {
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
    backgroundColor: '#2E86C1',
    paddingLeft: 60,
    paddingRight: 60,
  },



});
