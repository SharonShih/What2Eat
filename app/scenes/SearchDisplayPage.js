import React, {Component} from 'react';
import {YelpAuth} from '../../services/YelpFusion';
import {Alert, ImageBackground, Image, StyleSheet, Text, View, Button, Linking} from "react-native";
import {Header, Icon, Left} from "native-base";
import openMap, {createOpenLink} from 'react-native-open-maps';

export default class YelpSearchRequest extends Component<Props> {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'home'} style={{fontSize: 24, color: tintColor}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      searchInfo: this.props.navigation.getParam('searchInfo', ''),
      randomNum: 0,
    }
  }

  componentDidMount() {
    return fetch(this.state.searchInfo, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + YelpAuth,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TODO: Avoid the situation when the businesses is closed
        this.setState({
          isLoading: false,
          dataSource: responseJson.businesses,
        })
        this.randomChoice();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  randomChoice() {
    var min = 0;
    var max = this.state.dataSource.length;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    console.log(this.state.dataSource.length);
    console.log("random:" + String(random));
    this.setState({
      randomNum: random,
    })

  }

  // goPlace(coordinates) {
  //   return (
  //     <Popup
  //       isVisible={this.state.isVisible}
  //       onCancelPressed={() => this.setState({isVisible: false})}
  //       onAppPressed={() => this.setState({isVisible: false})}
  //       onBackButtonPressed={() => this.setState({isVisible: false})}
  //       modalProps={{ // you can put all react-native-modal props inside.
  //         animationIn: 'slideInUp'
  //       }}
  //       appsWhiteList={['apple-maps', 'google-maps']}
  //       options={{/* See `showLocation` method above, this accepts the same options. */}}
  //       style={{/* Optional: you can override default style by passing your values. */}}
  //     />
  //   )
  // }


render()
{
  if (this.state.isLoading) {
    return (
      <View style={styles.container}>
      </View>
    )
  } else {
    let name = this.state.dataSource[this.state.randomNum].name;
    let image_url = this.state.dataSource[this.state.randomNum].image_url;
    let url = this.state.dataSource[this.state.randomNum].url;
    let coordinates = this.state.dataSource[this.state.randomNum].coordinates.latitude + "+" + this.state.dataSource[this.state.randomNum].coordinates.longitude;
    //TODO: GOOGLE MAP
    // let google = "google.navigation:q=" + coordinates;
    let apple = "maps://app?daddr=" + coordinates;
    return (
      <ImageBackground source={require('../components/Stellar.png')}
                       style={styles.Background}>
        <Header>
          <Left>
            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
        <View style={styles.container}>
          <Text>{name}</Text>
          <Button title={"OPEN YELP"} onPress={() => Linking.openURL(url)}/>
          <Button title={"AppleMap"} onPress={() => Linking.openURL(apple)}/>
          <Image source={{uri: image_url}}
                 style={{width: 80, height: 80, justifyContent: 'flex-start'}}/>
          <Button title={"NEXT"} onPress={() => this.randomChoice()}/>
        </View>
      </ImageBackground>
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
  },
  Background: {
    width: '100%',
    height: '100%',
  },
});