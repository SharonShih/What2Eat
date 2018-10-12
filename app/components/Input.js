import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View>
            <TextInput
                autoCorrect = { false }
                onChangeText = {onChangeText}
                placeholder = {placeholder}
                style = {styles.input}
                secureTextEntry = {secureTextEntry}
                value = {value}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        fontSize: 18,
        color: "#FFF",
        marginBottom: 30,
        height: 40,
        borderBottomColor: "#FFF",
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

export { Input };