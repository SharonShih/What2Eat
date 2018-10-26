import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator, Button} from "react-native";

type Props = {};
export default class ForgetPassForm extends Component<Props> {
    state = {
        email: '',
    }

    onPressReset() {
        //TODO: reset password method
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
                    onPress={() => this.onPressReset()} />
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
