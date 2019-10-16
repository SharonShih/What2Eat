import React, {Component} from 'react';
import {Header, Left, Icon} from 'native-base'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,  ScrollView, Animated, TouchableOpacity, Easing,
} from "react-native";
import Firebase from "../../services/Firebase";
import ModalSelector from "react-native-modal-selector";


type Props = {};
export default class GroupOwnerDetail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isGroupOwner: this.props.navigation.getParam('isGroupOwner', ''),
      haveResult: false,
      groupId: this.props.navigation.getParam('groupId', ''),
      radius: 3219,
      textInputValue: "Range: 2 Miles",
      initialPosition: {
        latitude: 0,
        longitude: 0,
      },
      //TODO: change it later
      groupDoc: {},
    }
  }

  componentDidMount() {
    this.animatedValue = new Animated.Value(2);
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

    //TODO: change it later
    let db = Firebase.firestore(Firebase);
    let docRef = db.collection("groups").doc(this.state.groupId);
    docRef.get().then( (doc) => {
      if (doc.exists) {
        this.setState({groupDoc: doc.data()})
      }
    })

      let query = db.collection('groups').doc(this.state.groupId);
      let observer = query.onSnapshot(querySnapshot => {
        console.log(querySnapshot);
        this.setState({groupDoc: querySnapshot.data()})
      }, err => {
        console.log(`Encountered error: ${err}`);
      });

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
    //TODO: change it later if groupDoc is passed
    let length = 0;
    if (this.state.groupDoc.groupMember) {
      length = this.state.groupDoc.groupMember.length;
    }

    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Range' },
      { key: index++, label: 'Range: 2 Miles', value: 3219},
      { key: index++, label: 'Range: 4 Miles', value: 6438},
      { key: index++, label: 'Range: 6 Miles', value: 9656},
      { key: index++, label: 'Range: 8 Miles', value: 12874},
    ];
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <Header style={{backgroundColor: "#7174BF"}}>
          <Left>
            <Icon name={'menu'} style={{color: "white"}} onPress={() => this.props.navigation.openDrawer() } />
          </Left>
          <Text style={styles.headerTitle}>Group</Text>
        </Header>

        <ScrollView>
          <View>
            <Text style={styles.titleText} >
              Total group mebers:
            </Text>
            <Text style={styles.totalNumberText} >
              {length}
            </Text>
          </View>
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
              <Animated.View style={[animatedStyle]}/>
            </Animated.View>
          </View>

        </ScrollView>
      </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  totalNumberText: {
    fontSize: 40,
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  Background: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    paddingTop: 50,
    paddingBottom: 30,

    marginRight:90,
    marginLeft:100,
  },
  headerTitle: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    paddingTop: 20,
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  button: {
    color: '#FFF',
    opacity: 0.7,
    textAlign: 'left',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 40,
  },
  chips: {
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: "#FFF",
    borderRadius: 32,
    height: 40,
    marginBottom: 10,
    marginTop: 5,
    marginRight: 10,
    flexDirection: 'row',
  },
  chipText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: 'left',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  chipButton: {
    color: "#FFF",
    fontSize: 25,
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  submit: {
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
  Button2:{
    height: 45,
    width: 280,
    borderRadius: 10,
    //backgroundColor: "white",
    color: 'white',
    paddingHorizontal: 25,
    marginBottom: 10,
    marginTop: 10,
    justifyContent:'space-around',

    alignSelf: 'center',

  },
  outerCircle: {
    borderRadius: 200,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    opacity: 0.4,
    width: 280,
    height: 280,
    marginTop: 60,
    //marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: "white",
    opacity: 0.5,
    borderRadius: 120,
    width: 240,
    height: 240,
    margin: 20,
    //alignSelf: 'center',
  },
  circleText: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    paddingTop: 155,
    paddingLeft: 120,

  },

});