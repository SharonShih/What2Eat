import React, {Component} from 'react';
import {Header, Left, Icon} from 'native-base'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground, Alert, Button, ScrollView, TouchableHighlight, Image,
} from "react-native";
import Firebase from "../../services/Firebase";

//TODO: instead passing information of group, pass group doc

type Props = {};
export default class GroupPage extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      userId: Firebase.auth().currentUser.uid,
      groupId: '',
      isGroupOwner: false,
    }
  }

  onPressedCreate() {
    return fetch(
      'https://us-central1-what2eat-9458a.cloudfunctions.net/createGroup', {
        method: 'POST',
        body: JSON.stringify({
          userId: Firebase.auth().currentUser.uid
        }),
      })
      .then((response) => {
        response.json().then(function (data) {
          this.setState({
            groupId: data.toString(),
            isGroupOwner: true,
          })
          this.navigator();
        }.bind(this))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  onPressedJoin() {
    return fetch(
      'https://us-central1-what2eat-9458a.cloudfunctions.net/joinGroup', {
        method: 'POST',
        body: JSON.stringify(this.state),
      })
      .then((response) => {
        console.log(response.status === 200)
        if (response.status === 200) {
          this.navigator();
        } else {
          Alert.alert("Group does not exist");
        }
      })
      .catch((error) => {
        console.log(error.message)
      })

  }

  checkGroupMember = (callback) =>  {
    let db = Firebase.firestore(Firebase);
    let docRef = db.collection("groups").where('groupMember', 'array-contains', this.state.userId)
    docRef.get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            if (snapshot.size === 1) {
              if (doc.data().groupOwner === this.state.userId) {
                this.setState({
                  isGroupOwner: true
                });
              }
              this.setState({
                groupId: doc.id,
              });
              console.log(this.state);
              callback();
              return;
            } else {
              console.log("catch group ID failed");
            }
          });
          return;
        }
      })
      .catch(err => {
        console.log('Error getting documents: ', err);
      });
  }

  navigator = () =>  {
    if (this.state.isGroupOwner) {
      this.props.navigation.navigate('GroupOwnerDetail',
        {
          groupId: this.state.groupId,
          isGroupOwner: this.state.isGroupOwner
        });
    } else {
      this.props.navigation.navigate('GroupMemberDetail',
        {
          groupId: this.state.groupId,
          isGroupOwner: this.state.isGroupOwner
        });
    }
  }

  componentDidMount() {
    this.checkGroupMember(this.navigator);
  }

  render() {
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <Header style={{backgroundColor: "#7174BF"}}>
          <Left>
            <Icon name={'menu'} style={{color: "white"}} onPress={() => this.props.navigation.openDrawer()}/>
          </Left>
          <Text style={styles.headerTitle}>Group</Text>
        </Header>

        <ScrollView>
          <View style={styles.ProfileForm}>
            <Image source={require('../components/w2e_logo.png')} style={styles.logo}></Image>
            <TouchableHighlight
              style={styles.Button2}>
              <Button
                title="Create Group"
                color="#5A6978"
                onPress={() => this.onPressedCreate()}/>
            </TouchableHighlight>

            <TextInput
              style={styles.textInput}
              maxLength={6}
              placeholder="Enter Your Group Code To Join"
              underlineColorAndroid='transparent'
              keyboardType={'numeric'}
              onChangeText={(text) => this.setState({groupId: text})}
            />

            <TouchableHighlight
              style={styles.Button2}>
              <Button
                title="Join Group"
                color="#5A6978"
                onPress={() => this.onPressedJoin()}/>
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

    marginRight: 90,
    marginLeft: 100,
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
  Button2: {
    height: 45,
    width: 250,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
  },
  textInput: {

    alignSelf: 'stretch',
    fontSize: 20,
    color: "#FFF",
    marginBottom: 25,
    marginTop: 10,
    height: 40,
    borderBottomColor: "#FFF",
    borderBottomWidth: 0.5,
    marginHorizontal: 20,

  },
});