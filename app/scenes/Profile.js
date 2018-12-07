import React, {Component} from 'react';
import {Header, Left, Right, Icon} from 'native-base'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground, Alert, Button, ScrollView, TouchableHighlight, Image,
} from "react-native";
import Firebase from "../../services/Firebase";


type Props = {};
export default class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      uid: Firebase.auth().currentUser.uid,
      email: Firebase.auth().currentUser.email,
      preference: []
    }
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'md-person'} style={{fontSize: 24, color: 'white'}}/>
    )
  }
  onPressedSubmit = () => {
    this.props.navigation.navigate('ChooseFavorite')
  }

  componentDidMount() {
    let db = Firebase.firestore(Firebase);
    db.settings({
      timestampsInSnapshots: true
    });
    let docRef = db.collection("users").doc(this.state.uid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        var tempArray = [];
        let field = doc.get('preference');
        for (let index = 0; index < field.length; index++) {
          tempArray.push(field[index]);
        }
        this.setState({
          preference: tempArray
        })
      } else {
        // doc.data() will be undefined in this case
      }
    }.bind(this)).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  render() {
    var preferenceInfo = [];
    for (let i = 0; i < this.state.preference.length; i++) {
      preferenceInfo.push(
        <View key={i} style={{flexDirection: 'row'}}>
          <View style={styles.chips}>
            <Text style={styles.chipText}>{this.state.preference[i]}</Text>
          </View>
        </View>
      )
    }
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <Header style={{backgroundColor: "#7174BF"}}>
          <Left>
            <Icon name={'menu'} style={{color: "white"}} onPress={() => this.props.navigation.openDrawer() } />
          </Left>
          <Text style={styles.headerTitle}>Profile</Text>
        </Header>

        <ScrollView>
          <View style={styles.ProfileForm}>
            <Image source={ require ('../components/w2e_logo.png')} style={styles.logo}></Image>


            <Text style={styles.infoTitle}>Account ID</Text>
            <View style={styles.infoBox}>
              <Text style={styles.info}> {this.state.uid}</Text>
            </View>
            <Text style={styles.infoTitle}>Email</Text>
            <View style={styles.infoBox}>
              <Text style={styles.info}>{this.state.email}</Text>
            </View>
            <Text style={styles.infoTitle}>Preference</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {preferenceInfo}
            </View>

            <TouchableHighlight
              style ={styles.Button2}>
              <Button
                title="Edit Preference"
                color="#5A6978"
                onPress={() => this.onPressedSubmit()} />

            </TouchableHighlight>


          </View>
        </ScrollView>
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
  logo: {

    width: 150,
    height: 150,
    paddingTop: 50,
    paddingBottom: 30,

    marginRight:90,
    marginLeft:100,
  },
  headerTitle:{
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    paddingTop: 20,
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
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
    width: 250,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
  },

});