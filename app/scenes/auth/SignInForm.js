import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

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
            <View>
                <Text style={styles.header}> Sign In </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder = "Please enter your email..."
                    keyboardType = "email-address"
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={(text) => this.setState({ email: text })}
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder = "Please set up your password.."
                    secureTextEntry
                    autoCapitalize = "none"
                    autoCorrect = { false }
                    onChangeText={(text)  => this.setState({ password: text })}
                    value = {this.state.password}
                />
                <Button
                    title="Log In"
                    onPress={() => this.onPressSignIn()} />
                <Button title="Forget Password?"
                    onPress= {() => this.props.navigation.navigate('ForgetPassForm')} />
                <Button title="Create Account"
                    onPress= {() => this.props.navigation.navigate('RegForm')} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
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
