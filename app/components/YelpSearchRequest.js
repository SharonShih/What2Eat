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
      searchInfo: this.props.navigation.state.params,
    }

  }

  componentDidMount() {
    fetch(this.state.searchInfo, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + YelpAuth,
      }
    })
      .then ( (response) => response.json() )
      .then ( (responseJson) => {
        //TODO: STORE JSON TO REDUX

        //TODO: STORE RESTAURANT ID TO RESTAURANTID
        // let restaurantID = []
        // this.props.navigation.navigate('SearchDisplayPage', {restaurantID})
        this.setState ({
          isLoading: false,
          dataSource: responseJson
        })
        Alert.alert('in');
      })
    .catch((error) => {
      Alert.alert(error);
    });
  }
  render () {
    return <Text>Good</Text>;
  }
}