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
import {Header, Icon, Left, Right} from "native-base";

type Props = {};
export default class MainPage extends Component<Props> {

  static navigationOptions={
    drawerIcon:({tintColor})=>(
      <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      radius: 400,
      initialPosition: {
        latitude: 0,
        longitude: 0,
      }
    };

      // var checkUidExist = () => {
      //   let uid = Firebase.auth().currentUser.uid;
      //   var db = Firebase.firestore(Firebase);
      //   Alert.alert(uid);
      //   db.settings({
      //     timestampsInSnapshots: true
      //   });
      //   var docRef = db.collection("users").doc(uid);
      //   docRef.get().then(function(doc) {
      //     if (doc.exists) {
      //       Alert.alert("yes");
      //     } else {
      //       Alert.alert("no");
      //       this.props.navigation.navigate('SearchDisplayPage');
      //     }
      //   }).catch(function(error) {
      //     console.log("Error getting document:", error);
      //   });
      // };
      // checkUidExist();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      let initialRegion = {
        latitude: lat,
        longitude: long,
      };
      this.setState({initialPosition: initialRegion})
    }, (error) => {
       Alert.alert(error.message);
    })
  }

  onPressSearchTarget() {
    let searchInfo = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='
      + this.state.initialPosition.latitude + '&longitude=' + this.state.initialPosition.longitude
      + '&radius=' + this.state.radius;
     Alert.alert(searchInfo);
    this.props.navigation.navigate('YelpSearchRequest', {searchInfo: searchInfo});
//    this.props.navigation.navigate('DisplayInfo', searchInfo = {searchInfo});
  }

  render() {

    return (
      <ImageBackground source={require('../components/Stellar.png')}
                       style={styles.Background}>
        <Header>
          <Left>
            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer() }/>
          </Left>
        </Header>
        <View>
        <Text style={styles.circleText}>What to{"\n"}Eat Today?</Text>
        <View style={styles.outerCircle}>
          <TouchableOpacity onPress ={this.onPressSearchTarget.bind(this)}><View style={styles.circle}>
          </View></TouchableOpacity>
        </View>
        </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
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

});