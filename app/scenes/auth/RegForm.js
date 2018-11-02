import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert} from "react-native";
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
            <View style = {styles.RegForm}>
                <Text style={styles.header}> Registration </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder = "Please enter your email..."
                    keyboardType = "email-address"
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={email => this.setState({ email })}
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder = "Please set up your password.."
                    secureTextEntry
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={password  => this.setState({ password })}
                    value = {this.state.password}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder = "Please confirm your password.."
                    secureTextEntry
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={passwordConfirm  => this.setState({ passwordConfirm })}
                    value = {this.state.passwordConfirm}
                />
                <Button
                    title= "Sign Up"
                    onPress={() => this.onPressSignUp()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    RegForm: {
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

