import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, TouchableHighlight, Image} from 'react-native';

import Firebase from '../../../services/Firebase';

export default class SignInForm extends Component<Props> {
  static navigationOptions = {
    // title: '',
    // headerStyle: {
    //     backgroundColor: '#7174BF',
    //     marginTop: 0,
    //     borderBottomWidth: 0,
    //     opacity:1,
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //     fontWeight: 'bold',
    //     fontSize:25,
    //
    // },

    header: null
  };


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  onPressSignIn() {
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        this.props.navigation.navigate('Home');
      }, (error) => {
        Alert.alert(error.message);
      });
  }


  render() {
    return (

      <ImageBackground
        source={ require ('../../components/Stellar.png')}
        style={styles.Background}>



        <View style={styles.ProfileForm}>


          <Image source={ require ('../../components/w2e_logo.png')} style={styles.logo}></Image>

          <Text style = {styles.header}> Welcome To What2Eat!</Text>


          <TextInput
            style={styles.textInput}
            placeholder = "Email"
            placeholderTextColor="white"
            keyboardType = "email-address"
            autoCapitalize = "none"
            autoCorrect = { false }
            onChangeText={(text) => this.setState({ email: text })}
            value = {this.state.email}
          />

          <TextInput
            style={styles.textInput}
            placeholder = "Password"
            placeholderTextColor="white"
            secureTextEntry
            autoCapitalize = "none"
            autoCorrect = { false }
            onChangeText={(text)  => this.setState({ password: text })}
            value = {this.state.password}
          />



          <TouchableHighlight
            style ={styles.signinButton2}>

            <Button
              title="Sign In"
              color="#5A6978"
              onPress={() => this.onPressSignIn()} />

          </TouchableHighlight>
          <View style = {styles.forgetText}>
            <Button
              title="Forget Password?"
              color ='#FFF'
              onPress= {() => this.props.navigation.navigate('ForgetPassForm')} />
          </View>


          <Text style = {styles.text2}> ------------- OR  -------------</Text>
          <TouchableHighlight
            style ={styles.signinButton2}>

            <Button
              title="Sign Up"
              color="#5A6978"
              onPress={() => this.props.navigation.navigate('RegForm')} />

          </TouchableHighlight>




        </View>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

  ProfileForm: {
    alignSelf: 'stretch',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  header: {
    color: "white",
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 5,

  },

  textInput: {

    alignSelf: 'stretch',
    fontSize: 20,
    color: "#FFF",
    marginBottom: 25,
    marginTop: 10,
    height: 40,
    borderBottomColor: "#FFF",
    borderBottomWidth: 0.5,
    marginHorizontal: 20,

  },

  logo: {
    //color: '#FFFFFF',
    //fontFamily: 'Arial',
    //fontSize: 21,
    //fontWeight: "900",
    //textAlign: 'center',

    width: 150,
    height: 150,

    //borderStyle: "solid",
    //borderColor: '#FFFFFF',
    //borderWidth: 4,

    paddingTop: 50,
    paddingBottom: 30,

    marginRight:90,
    marginLeft:100,
  },

  Background: {
    width: '100%',
    height: '100%',
  },


  signinButton2:{
    height: 45,
    width: 280,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  forgetText:{
    fontSize: 20,
    color: "#FFF",
    textAlign: 'center',
    opacity: 0.7,
  },
  text2:{
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,

  },
  signUp:{
    paddingTop: 70,
  }


});
