import React, {Component} from 'react';
import {Header, Left, Right, Icon} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView, TouchableOpacity
} from "react-native";
import Firebase from "../../services/Firebase";


export default class HistoryScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'ios-time'} style={{fontSize: 24, color: 'purple'}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      visited_restaurant: []
    }
  }

  componentDidMount() {
    let uid = Firebase.auth().currentUser.uid;
    let db = Firebase.firestore(Firebase);
    db.settings({
      timestampsInSnapshots: true
    });
    let docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        let tempArray = [];
        let field = doc.get('visited_restaurant');
        for (let index = 0; index < field.length; index++) {
          tempArray.push(field[index]);
        }
        this.setState({visited_restaurant: tempArray})
        console.log(tempArray);
      } else {
        // doc.data() will be undefined in this case
      }
    }.bind(this)).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }


  render() {
    let  visited_restaurantInfo= [];
    for (let i = 0; i < this.state.visited_restaurant.length; i++) {
      visited_restaurantInfo.push(
      <View key ={i} style = {{flexDirection: 'row' }}>
        <Text style = {styles.flag}>&#10148;</Text>
        <View style = {styles.infoBox}>
          {/*<Text style = {styles.info}>this.state.visited_restaurant[i].date</Text>*/}
          <Text style = {styles.info1}>{this.state.visited_restaurant[i].name}</Text>
          <Text style = {styles.info2}>{this.state.visited_restaurant[i].location.display_address.toString()}</Text>
        </View>
      </View>
      )
    }
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <Header style={{backgroundColor: "##s9b989c"}}>
          <Left>
            <Icon name={'menu'} style={{color: "black"}} onPress={() => this.props.navigation.openDrawer() } />
          </Left>
          <Text style={styles.headerTitle}>History</Text>
        </Header>
        <ScrollView>
          <View style = {styles.ProfileForm}>
            {visited_restaurantInfo}
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  ProfileForm: {
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
  Background:{
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
  infoBox:{

    padding: 5,
    width: 290,
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,

  },
  info:{
    fontSize: 17,
    textAlign: "right",
    paddingRight: 5,
    color: '#000',
  },
  info1:{
    fontSize: 17,
    color: '#000',
  },
  info2:{
    fontSize: 15,
    color: '#666666',

  },
  flag: {
    color: '#000',
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 30,
  },
});

