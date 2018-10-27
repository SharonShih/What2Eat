import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from 'react-native';
import Firebase from '../../services/Firebase';

export default class Home extends Component<Props> {

    static navigationOptions = {
        header: null
    }

    onPressSignOut = () => {
       Firebase.auth().signOut();
    }

    render() {
        return (
          <View style={{paddingTop:50, alignItems:"center"}}>
              <Text>Home</Text>
              <Button
                  title = "Sign Out"
                  onPress={() => this.onPressSignOut()}
              />
          </View>
        );
    }


}

