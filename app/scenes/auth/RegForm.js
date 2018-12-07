import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, TouchableHighlight, Image} from "react-native";
import Firebase from '../../../services/Firebase';
import MainPage from "../MainPage";

export default class RegForm extends Component<Props> {


  constructor(Props) {
    super(Props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  onPressSignUp() {
    if (this.state.password  != this.state.passwordConfirm) {
      Alert.alert("Password do not match")
    }
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        let uid = Firebase.auth().currentUser.uid;
        let db = Firebase.firestore(Firebase);
        db.settings({
          timestampsInSnapshots: true
        });
        //TODO: reset database
        db.collection("users").doc(uid).set(
          {
            disliked_restaurant: [],
            preference: [],
            visited_restaurant: [],
          }
        ).then(function () {
          console.log("Document successfully written!");
        })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }, (error) => {
        Alert.alert(error.message)
      });
  }

  render() {
    return (
      <ImageBackground
        source={ require ('../../components/Stellar.png')}
        style={styles.Background}>

        <Image source={ require ('../../components/w2e_logo.png')} style={styles.logo}></Image>


        <Text style={styles.welcomeTxt}>Create A Account!</Text>


        <View style = {styles.RegForm}>
          <TextInput
            style={styles.textInput}
            placeholder = "Email"
            placeholderTextColor="white"
            keyboardType = "email-address"
            autoCapitalize = "none"
            autoCorrect = { false }
            onChangeText={email => this.setState({ email })}
            value = {this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder = "Password"
            placeholderTextColor="white"
            secureTextEntry
            autoCapitalize = "none"
            autoCorrect = { false }
            onChangeText={password  => this.setState({ password })}
            value = {this.state.password}
          />
          <TextInput
            style={styles.textInput}
            placeholder = "Confirm Password"
            placeholderTextColor="white"
            secureTextEntry
            autoCapitalize = "none"
            autoCorrect = { false }
            onChangeText={passwordConfirm  => this.setState({ passwordConfirm })}
            value = {this.state.passwordConfirm}
          />

          <TouchableHighlight
            style ={styles.signupButton}>

            <Button
              title= "Sign Up"
              color="#5A6978"
              onPress={() => this.onPressSignUp()} />

          </TouchableHighlight>


        </View>


      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({

  RegForm: {
    alignSelf: 'stretch',
  },


  textInput: {
    alignSelf: 'stretch',
    fontSize: 18,
    color: "#FFF",
    marginBottom: 30,
    height: 30,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    marginHorizontal: 40,

  },

  Background: {
    width: '100%',
    height: '100%',
  },


  welcomeTxt: {
    letterSpacing: 1,
    color:"#FFFFFF",
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  logo: {

    width: 150,
    height: 150,

    paddingTop: 50,
    paddingBottom: 30,

    marginRight:90,
    marginLeft:120,
  },

  signupButton: {
    height: 45,
    width: 280,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  }
});

