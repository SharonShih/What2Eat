import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress = {onPress}>
        <Text> {children} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 20,
    }
})

export { Button };