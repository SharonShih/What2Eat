import React, {Component} from 'react';
import Firebase from '../../services/Firebase'

import {StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, Animated, Easing} from "react-native";
import ModalSelector from 'react-native-modal-selector'

import {Header, Icon, Left} from "native-base";

type Props = {};
export default class MainPage extends Component<Props> {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'home'} style={{fontSize: 24, color: 'white'}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      radius: 3219,
      textInputValue: "Range: 2 Miles",
      initialPosition: {
        latitude: 0,
        longitude: 0,
      }
    };

    var checkUidExist = () => {
      let uid = Firebase.auth().currentUser.uid;
      var db = Firebase.firestore(Firebase);
      db.settings({
        timestampsInSnapshots: true
      });
      var docRef = db.collection("users").doc(uid);
      docRef.get().then(function(doc) {

        var tempArray = [];
        let field = doc.get('preference');
        for (let index = 0; index < field.length; index++) {
          tempArray.push(field[index]);
        }
        //Alert.alert(field.length);
        if (field.length==0) {
          this.props.navigation.navigate('ChooseFavorite');
        }
      }.bind(this)).catch(function(error) {
      });
    };
    checkUidExist(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(2);

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
      Console.log(error.message);
    })


    Animated.loop(
      Animated.timing(this.animatedValue, {
        toValue: 0.3,
        duration: 4000,
        easing: Easing.bounce
      })
    ).start()
  }

  onPressSearchTarget() {
    let searchInfo = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='
      + this.state.initialPosition.latitude + '&longitude=' + this.state.initialPosition.longitude
      + '&radius=' + this.state.radius.toString();
    this.props.navigation.navigate('SearchDisplayPage', {searchInfo: searchInfo});
  }

  render() {

    const animatedStyle = {
      opacity: this.animatedValue
    };

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
        <Header style={{backgroundColor: "#s9b989c"}}>
          <Left>
            <Icon name={'menu'} style={{color: "black"}} onPress={() => this.props.navigation.openDrawer() } />
          </Left>
          <Text style={styles.headerTitle}>What2Eat</Text>

        </Header>
        <Text style={styles.greeting}>GREENTINGS!!!{"\n"}{new Date().toDateString()}</Text>

        <View style={styles.Button2}>
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
              style={{borderWidth:1, borderColor:'#ccc', backgroundColor:'white',opacity: 0.85,padding:10, height:40, borderRadius: 10}}
              editable={false}
              placeholder="Range: 2 Miles"
              value={this.state.textInputValue}> </TextInput>
          </ModalSelector>
        </View>


        <View>
          <Text style={styles.circleText}>What to{"\n"}Eat Today?</Text>
          <Animated.View style={[styles.outerCircle, animatedStyle]}>
            <TouchableOpacity onPress ={this.onPressSearchTarget.bind(this)}>
              <View style={styles.circle}></View>
            </TouchableOpacity>
            <Animated.View style={[styles.circle2, animatedStyle]}/>
          </Animated.View>
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
  headerTitle:{

    color: 'black',
    fontSize: 15,
    justifyContent: 'center',
    paddingTop: 20,
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  greeting:{

    fontSize: 18,
    color: 'black',
    marginTop: 40,
    textAlign:'left',
    paddingLeft: 30,
    paddingBottom: 20,

  },


  outerCircle: {
    borderRadius: 200,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    opacity: 0.4,
    width: 280,
    height: 280,
    marginTop: 60,
    //marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: 120,
    width: 240,
    height: 240,
    margin: 20,
    //alignSelf: 'center',
  },
  circleText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    paddingTop: 155,
    paddingLeft: 120,

  },
  Button2:{
    height: 45,
    width: 280,
    borderRadius: 10,
    //backgroundColor: "white",
    color: 'black',
    paddingHorizontal: 25,
    marginBottom: 10,
    marginTop: 10,
    justifyContent:'space-around',

    alignSelf: 'center',

  },
});