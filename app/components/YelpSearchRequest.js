import React, {Component} from 'react';
import { YelpAuth } from '../../services/YelpFusion';
import {Alert} from "react-native";
import {StyleSheet, Text, View, Button} from 'react-native';

export default class YelpSearchRequest extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount () {
        return fetch('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=37.452709&longitude=-121.910187&radius=400', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + YelpAuth,
            }
        })
            .then ( (response) => response.json() )
            .then( (responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.businesses,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                </View>
            )
        } else {
            let movies = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.item}><Text>{val.name}</Text></View>
            });
            return (
                <View style={styles.container}>

                    {movies}
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});