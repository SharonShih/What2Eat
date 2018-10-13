import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { Input } from "../components/Input.js";
import { Button } from "../components/Button.js";

type Props = {};
export default class RegForm extends Component<Props> {
    state = {
        firstname:'',
        lastname: '',
        email: '',
        password: '',
    }

    render() {
        return (
            <View style = {styles.RegForm}>
                <Text style={styles.header}> Registration </Text>
                <Input
                    label = 'First Name'
                    placeholder = "Please enter your first name..."
                    onChangeText={firstname => this.setState({ firstname })}
                    value = {this.state.firstname}
                />
                <Input
                    placeholder = "Please enter your last name..."
                    onChangeText={lastname => this.setState({ lastname })}
                    value = {this.state.lastname}
                />
                <Input
                    placeholder = "Please enter your email..."
                    onChangeText={email => this.setState({ email })}
                    value = {this.state.email}
                />
                <Input
                    placeholder = "Please set up your password.."
                    secureTextEntry
                    onChangeText={password  => this.setState({ password })}
                    value = {this.state.password}
                />
                <Button onPress={() => console.log("pressed")}>Log In</Button>
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

    }
});
