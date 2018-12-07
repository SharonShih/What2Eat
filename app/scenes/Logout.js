
import React, {Component} from "react";
import {StyleSheet, Text, View, Button,ImageBackground,TouchableHighlight,Image} from 'react-native';
import Firebase from '../../services/Firebase';
import {Icon} from "native-base";

export default class Home extends Component<Props> {

  static navigationOptions={
    drawerIcon:({tintColor})=>(
      <Icon name={'md-exit'} style={{fontSize:24, color: 'white'}}/>
    )
  }

  onPressSignOut = () => {
    Firebase.auth().signOut();
  }

  render() {
    return (
      <ImageBackground source={require('../components/Stellar.png')}
                       style={styles.Background}>
        <View style={{paddingTop:50, alignItems:"center"}}>
          <Image source={ require ('../components/w2e_logo.png')} style={styles.logo}></Image>
          <Text style ={styles.text}>Are You Sure You Want to Sign Out?</Text>
          <TouchableHighlight
            style ={styles.signinButton2}>

            <Button
              title="Yes, Sign Me Out"
              color="#5A6978"
              onPress={() => this.onPressSignOut()} />
          </TouchableHighlight>

          <Text style = {styles.text2}> ------------- OR  -------------</Text>

          <TouchableHighlight
            style ={styles.signinButton2}>
            <Button
              title="No, go back to Home."
              color="#5A6978"
              onPress={() => this.props.navigation.navigate("MainPage")} />
          </TouchableHighlight>


        </View>

      </ImageBackground>
    );
  }


}

const styles = StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
  },
  text:{
    color:'#FFF',
    fontSize: 30,
    paddingHorizontal: 60,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',

  },
  text2:{
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,

  },
  signinButton2:{
    height: 45,
    width: 280,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 40,
    marginBottom: 40,
    marginTop: 5,
  },
  logo: {

    width: 130,
    height: 130,

    marginRight:90,
    marginLeft:100,
  },

});