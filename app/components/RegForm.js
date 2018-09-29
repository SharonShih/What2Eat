import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

type Props = {};
export default class RegForm extends Component<Props> {
    render() {
        return (
            <View style = {styles.RegForm}>
                <Text style={styles.header}> Registration </Text>
                <TextInput style={styles.input} placeholder = "first name"></TextInput>
                <TextInput></TextInput>
                <TextInput></TextInput>
                <TextInput></TextInput>
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
        borderBottomColor: "#2D911E",

    },
    input: {
        alignSelf: 'stretch',
        fontSize: 18,
        color: "#FFF",
    }
});