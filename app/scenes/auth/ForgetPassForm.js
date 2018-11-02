import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert} from "react-native";
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
            <View style = {styles.ForgetPassForm}>
                <Text style={styles.header}> Forget Passoword </Text>
                <TextInput style={styles.textInput}
                    placeholder = "Please enter your email..."
                    onChangeText={email => this.setState({ email })}
                    value = {this.state.email}
                />
                <Button
                    title= "Reset"
                    onPress={() => this.onPressReset()}
                />
            </View>
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
        marginBottom: 30,
        height: 40,
        borderBottomColor: "#FFF",
        borderBottomWidth: 1,
    }
});
