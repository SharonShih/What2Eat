import React, {Component} from 'react';
import {Header, Left, Right, Icon} from 'native-base'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground, Alert, Button, ScrollView,
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
      <Icon name={'home'} style={{fontSize: 24, color: tintColor}}/>
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
          <View style={styles.chips}><Text style={styles.chipText}>{this.state.preference[i]}</Text>
            <TouchableOpacity>
              <Text style={styles.chipButton}>&times;</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <Header>
          <Left>
            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
        <ScrollView>
          <View style={styles.ProfileForm}>
            <Text style={styles.header}>Your Profile </Text>
            <View style={styles.avatar}></View>

            <Text style={styles.infoTitle}>Account ID</Text>
            <View style={styles.infoBox}>
              <Text style={styles.info}> {this.state.uid}</Text>
            </View>
            <Text style={styles.infoTitle}>Email</Text>
            <View style={styles.infoBox}>
              <Text style={styles.info}>{this.state.email}</Text>
            </View>
            <Text style={styles.infoTitle}>Your Tags</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {preferenceInfo}
            </View>
            <Button onPress={() => this.onPressedSubmit()
            } title=" Edit"
                    color={'white'}
            >
            </Button>
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
  avatar: {
    backgroundColor: "#FFF",
    borderRadius: 100,
    width: 115,
    height: 115,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
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

});