
import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from 'react-native';
import Firebase from '../../services/Firebase';
import {Icon} from "native-base";

export default class Home extends Component<Props> {

  static navigationOptions={
    drawerIcon:({tintColor})=>(
      <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
    )
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