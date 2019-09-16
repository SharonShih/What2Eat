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
      groupId: ''
    }
  }

  onPressedSubmit() {
    return fetch (
      'https://us-central1-what2eat-9458a.cloudfunctions.net/createGroup', {
        method: 'GET',
        body: {
          userId: Firebase.auth().currentUser.uid
        }
    })
      .then ((response) => {
        console.log(response)
        this.setState({groupId: response})
          .then(
            console.log('set state done')
          )
      })
      .catch((error) => {
      console.log(error.message)
      })
  }

  componentDidMount() {

  }

  render() {
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
          <View style={styles.ProfileForm}>
            <Image source={ require ('../components/w2e_logo.png')} style={styles.logo}></Image>


            <TouchableHighlight
              style ={styles.Button2}>
              <Button
                title="Create Group"
                color="#5A6978"
                onPress={this.onPressedSubmit} />

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