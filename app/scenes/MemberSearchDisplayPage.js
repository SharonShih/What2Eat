import React, {Component} from 'react';
import {YelpAuth} from '../../services/YelpFusion';
import {ImageBackground, Image, StyleSheet, Text, View, Button, Linking, TouchableHighlight} from "react-native";
import {Icon} from "native-base";
import Firebase from '../../services/Firebase';

export default class MemberSearchDisplayPage extends Component<Props> {
  static navigationOptions = {
    title: 'Result',
    headerStyle: {
      backgroundColor: '#7174BF',
      marginTop: 15,
      borderBottomWidth: 0,
      opacity: 0.7,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
      textAlign: 'left',

    },
    drawerIcon: ({tintColor}) => (
      <Icon name={'home'} style={{fontSize: 24, color: tintColor}}/>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      groupDoc: this.props.navigation.getParam('groupDoc', ''),
      result: "",
    }
  };

  componentDidMount() {
    this.setState( {
      result: this.state.groupDoc.result,
      isLoading: false,
    })
  }

  goPlace(url) {
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
        docRef.update(
          {
            visited_restaurant: tempArray,
          }
        ).then(function () {
          console.log("Document successfully written!");
        })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      } else {
        console.log("doesn't exist")
      }
    }.bind(this)).catch(function (error) {
      console.log("Error getting document:", error);
    });
    this.props.navigation.navigate('MainPage', '');
    Linking.openURL(url);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        </View>
      )
    } else {
      let name = this.state.result.name;
      let image_url = this.state.result.image_url;
      let categoriesRef = this.state.result.categories;
      let categories = [];
      for (let i = 0; i < categoriesRef.length; i++) {
        categories.push(categoriesRef[i].title);
      }
      let location = this.state.result.location.display_address.join(', ');
      let rating = this.state.result.rating;
      let display_phone = this.state.result.display_phone;
      let coordinates = this.state.result.coordinates.latitude + "+" + this.state.result.coordinates.longitude;
      //TODO: GOOGLE MAP
      // let google = "google.navigation:q=" + coordinates;
      let apple = "maps://app?daddr=" + coordinates;
      return (
        <ImageBackground source={require('../components/Stellar.png')}
                         style={styles.Background}>
          <Text style={styles.Text}>What To Eat Today{"\n"}&#8595; &#8595; &#8595; &#8595;</Text>
          <View style = {styles.container}>
            <Image source={{uri: image_url}} style={styles.image}/>
            <View style = {styles.shadowOffset}>
              <Text style = {styles.textName}>{name}</Text>
              <Text style = {styles.textInfo}>{categories.toString()}</Text>
              <Text style = {styles.textInfo}>&#10147; {location}</Text>
              <Text style = {styles.textInfo}>&#9733; {rating}/5 Stars </Text>
              <Text style = {styles.textInfo}>&#9990; {display_phone} </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableHighlight
              style={styles.goButton}>
              <Button
                title="Let's Go!"
                color="#000099"
                onPress={() => this.goPlace(apple)}/>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({

  Background: {
    width: '100%',
    height: '100%',
  },
  Text: {
    fontSize: 30,
    fontFamily: 'Georgia',
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 60,

  },

  image: {
    width: '100%',
    height: 200,


  },
  textName: {
    color: "#000",
    fontSize: 25,
    paddingLeft: 15,
    //paddingBottom: 3,
    paddingTop: 6,
  },
  textInfo: {
    color: "#000",
    fontSize: 15,
    paddingLeft: 15,
    //paddingTop: 5,
  },
  shadowOffset: {
    backgroundColor: '#FFF',
    height: 160,
    width: '100%',
    borderWidth: 0,

  },
  goButton: {
    height: 45,
    width: 180,
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: 40,
    marginBottom: 10,
    marginTop: 40,
  },
  nextButton: {
    height: 45,
    width: 100,
    borderRadius: 20,
    backgroundColor: "white",
    opacity: 0.7,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 40,
  },
  container:{
    backgroundColor: '#FFF',
    width: '90%',
    borderBottomColor: 'gray',
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 10,
    marginTop: 135,
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center',

  },
});