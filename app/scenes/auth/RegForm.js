import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, TouchableHighlight} from "react-native";
import Firebase from '../../../services/Firebase';

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
                this.props.navigation.navigate('Home');
        }, (error) => {
            Alert.alert(error.message)
        });
    }

    render() {
        return (
            <ImageBackground
                source={ require ('../../components/Stellar.png')}
                style={styles.Background}>


                <Text style={styles.logo}>What2Eat</Text>

                <Text style={styles.welcomeTxt}>Create What2Eat Account!</Text>


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
        marginBottom: 20,
        height: 30,
        borderBottomColor: "#FFF",
        borderBottomWidth: 1,
        marginHorizontal: 55,

    },

    Background: {
        width: '100%',
        height: '100%',
    },


    welcomeTxt: {
        letterSpacing: 1,
        color:"#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },

    logo: {
        color: '#FFFFFF',
        fontFamily: 'Arial',
        fontSize: 21,
        fontWeight: "900",
        textAlign: 'center',

        marginTop: 56,
        marginBottom: 19.5,

        borderStyle: "solid",
        borderColor: '#FFFFFF',
        borderWidth: 4,

        paddingTop: 50,
        paddingBottom: 50,

        marginRight:120,
        marginLeft:120,
    },

    signupButton: {
        height: 45,
        width: 280,
        borderRadius: 10,
        backgroundColor: "white",
        marginLeft: 50,
        marginRight: 50,
    }
});

