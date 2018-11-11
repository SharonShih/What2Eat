import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, TouchableHighlight} from "react-native";
import Firebase from '../../../services/Firebase';

type Props = {};
export default class ForgetPassForm extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    onPressReset() {
        Firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(()=>{
                Alert.alert("Reset password email sent");
                this.props.navigation.navigate('SignInForm')
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    render() {
        return (

            <ImageBackground
                source={ require ('../../components/Stellar.png')}
                style={styles.Background}>

                <Text style={styles.logo}>What2Eat</Text>

                <Text style={styles.welcomeTxt}>Reset Password!</Text>


                <View style = {styles.ForgetPassForm}>

                <TextInput style={styles.textInput}
                    placeholder = "Email"
                           placeholderTextColor="white"
                           keyboardType = "email-address"
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={email => this.setState({ email })}
                    value = {this.state.email}
                />

                    <TouchableHighlight
                        style ={styles.restButton}>
                <Button
                    title= "Reset"
                    color="#5A6978"
                    onPress={() => this.onPressReset()}
                />
                    </TouchableHighlight>


                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    ForgetPassForm: {
        alignSelf: 'stretch',

    },
    header: {
        fontSize: 24,
        color: "#FFF",
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        fontWeight: 'bold',

    },
    textInput: {
        alignSelf: 'stretch',
        fontSize: 18,
        color: "#FFF",
        marginBottom: 20,
        marginHorizontal: 60,
        height: 40,
        borderBottomColor: "#FFF",
        borderBottomWidth: 1,


    },

    Background: {
        width: '100%',
        height: '100%',
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

    welcomeTxt: {
        letterSpacing: 1,
        color:"#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 35,
    },

    restButton:{
        height: 45,
        width: 280,
        borderRadius: 10,
        backgroundColor: "white",
        marginLeft: 50,
        marginRight: 50,

    },


});
