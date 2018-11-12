import React, { Component } from 'react';

import {StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, TouchableHighlight} from 'react-native';

import Firebase from '../../../services/Firebase';

export default class SignInForm extends Component<Props> {



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

                <Text style={styles.logo}>What2Eat</Text>

                <Text style={styles.welcomeTxt}>Welcome back to What2Eat!</Text>

                <Button
                    style={styles.buttonTop}
                    title="Sign In"
                    color="#FFF"
                    onPress={() => this.props.navigation.navigate('SignInForm')} />
                <Button title="Sign Up"
                        color="#FFF"
                        onPress= {() => this.props.navigation.navigate('RegForm')} />

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

                <View style={{fontSize:100}}>
                <Button
                    title="Forget Password?"
                    color="#FFF"
                    onPress= {() => this.props.navigation.navigate('ForgetPassForm')} />

                </View>
            </View>

            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },


    ProfileForm: {
        alignSelf: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
    },

    textInput: {

        alignSelf: 'stretch',
        fontSize: 18,
        color: "#FFF",
        marginBottom: 30,
        height: 40,
        borderBottomColor: "#FFF",
        borderBottomWidth: 1,
        marginHorizontal: 20,

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

        marginRight:90,
        marginLeft:90,
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
    },

    signinButton2:{
        height: 45,
        width: 280,
        borderRadius: 10,
        backgroundColor: "white",
        marginLeft: 20,
        marginBottom: 30,
    },


});
