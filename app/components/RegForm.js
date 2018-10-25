import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity, Image,
} from "react-native";

type Props = {};
export default class RegForm extends Component<Props> {
    render() {
        return (
            <View style = {styles.RegForm}>
                <Text style={styles.header}> Registration </Text>
                <TextInput style={styles.input} placeholder = "First name"></TextInput>
                <TextInput style={styles.input} placeholder = "Last name"></TextInput>
                <TextInput style={styles.input} placeholder = "Email Address"></TextInput>
                <TextInput style={styles.input} placeholder = "Password"></TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    RegForm: {
        alignSelf: 'stretch',

    },
    header: {
        fontSize: 28,
        color: "#FFF",
        paddingBottom: 5,
        marginBottom: 40,
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        fontWeight: 'bold',

    },
    input: {
        alignSelf: 'stretch',
        fontSize: 18,
        color: '#FFF',
        marginBottom: 30,
        height: 40,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: "#000000",
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        marginTop: 30,

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    }
});