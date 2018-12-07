import React, {Component} from 'react';
import 'firebase/firestore';

import {StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert,} from "react-native";
import ModalSelector from 'react-native-modal-selector'

import {Header, Icon, Left, Right} from "native-base";

type Props = {};
export default class MainPage extends Component<Props> {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'home'} style={{fontSize: 24, color: tintColor}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      radius: 3219,
      textInputValue: '',
      initialPosition: {
        latitude: 0,
        longitude: 0,
      }
    };

    //TODO: check if acc first time log in
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
      console.log(error.message);
    })
  }

  onPressSearchTarget() {
    let searchInfo = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='
      + this.state.initialPosition.latitude + '&longitude=' + this.state.initialPosition.longitude
      + '&radius=' + this.state.radius.toString();
    this.props.navigation.navigate('SearchDisplayPage', {searchInfo: searchInfo});
  }

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Range' },
      { key: index++, label: 'Range: 2 Miles', value: 3219},
      { key: index++, label: 'Range: 4 Miles', value: 6438},
      { key: index++, label: 'Range: 6 Miles', value: 9656},
      { key: index++, label: 'Range: 8 Miles', value: 12874},
    ];
    return (
      <ImageBackground source={require('../components/Stellar.png')}
                       style={styles.Background}>
        <Header>
          <Left>
            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
        <View style={{flex:1, justifyContent:'space-around', padding:50}}>
          <ModalSelector
            data={data}
            initValue={this.state.radius.toString()}
            supportedOrientations={['portrait']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option)=>{
              this.setState({
                radius: (option.value),
                textInputValue: option.label,
            })}}>
            <TextInput
              style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
              editable={false}
              placeholder="Range: 2 Miles"
              value={this.state.textInputValue} />
          </ModalSelector>
        </View>
        <View>
          <Text style={styles.circleText}>What to{"\n"}Eat Today?</Text>
          <View style={styles.outerCircle}>
            <TouchableOpacity onPress={this.onPressSearchTarget.bind(this)}><View style={styles.circle}>
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