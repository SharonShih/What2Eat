import React, {Component} from 'react';
import Firebase from '../../services/Firebase';
import 'firebase/firestore';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, ImageBackground,
  Alert
} from "react-native";

type Props = {};
export default class MainPage extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      radius: 0,
      initialPosition: {
        latitude: 0,
        longitude: 0,
      }
    };
      var checkUidExist=()=>{
          let uid = Firebase.auth().currentUser.uid;
          var db=Firebase.firestore(Firebase);
          Alert.alert(uid);
          db.settings({
              timestampsInSnapshots: true
          });
          !db.collection("users").doc(uid).get()
              .then ( () => {this.props.navigation.navigate('ChooseFavorite');});
      };
      checkUidExist();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      var initialRegion = {
        latitude: lat,
        longitude: long,
      };
      this.setState({initialPosition: initialRegion})
    }, (error) => {
      Alert.alert(error.message);
    })
  }

  onPressSearchTarget() {
    var searchInfo = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='
      + this.state.initialPosition.latitude + '&longitude=' + this.state.initialPosition.longitude
      + '&radius=' + this.state.radius;
    this.props.navigation.navigate('DisplayInfo', searchInfo = {searchInfo});
  }

  render() {
    return (
      <ImageBackground source={require('../components/Stellar.png')}
                       style={styles.Background}>
        <Text style={styles.circleText}>What to{"\n"}Eat Today?</Text>

        <View style={styles.outerCircle}>
          <TouchableOpacity onPress ={this.onPressSearchTarget}><View style={styles.circle}>
          </View></TouchableOpacity>


        </View>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  ProfileForm: {
    alignSelf: 'stretch',
    paddingLeft: 30,
    paddingRight: 30,
  },
  Background: {
    width: '100%',
    height: '100%',
  },
  outerCircle: {
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    opacity: 0.45,
    width: 210,
    height: 210,
    marginTop: 260,
    marginBottom: 20,
    alignSelf: 'center',
  },
  circle: {
    backgroundColor: "white",
    opacity: 0.45,
    borderRadius: 100,
    width: 180,
    height: 180,
    margin: 15,
    alignSelf: 'center',
  },
  circleText: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    paddingTop: 325,
    paddingLeft: 120,

  },
  header: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  infoBox: {
    marginBottom: 20,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomColor: '#FFF',
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  info: {
    fontSize: 20,
    color: '#FFF',
  },
  button: {
    color: '#FFF',
    opacity: 0.7,
    textAlign: 'left',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 40,
  },


});