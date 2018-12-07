import React, {Component} from 'react';
import {YelpAuth} from '../../services/YelpFusion';
import {ImageBackground, Image, StyleSheet, Text, View, Button, Linking, TouchableHighlight} from "react-native";
import {Icon} from "native-base";
import Firebase from '../../services/Firebase';

export default class YelpSearchRequest extends Component<Props> {
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
      dataSource: null,
      searchInfo: this.props.navigation.getParam('searchInfo', ''),
      randomNum: 0,
    }
  };

  componentDidMount() {
    return fetch(this.state.searchInfo, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + YelpAuth,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TODO: Avoid the situation when the businesses is closed
        this.setState({
          isLoading: false,
          dataSource: responseJson.businesses,
        });
        this.randomChoice();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  randomChoice() {
    var min = 0;
    var max = this.state.dataSource.length;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    console.log(this.state.dataSource.length);
    console.log("random:" + String(random));
    this.setState({
      randomNum: random,
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
        tempArray.push(this.state.dataSource[this.state.randomNum]);
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
    this.props.navigation.goBack();
    Linking.openURL(url);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        </View>
      )
    } else {
      let name = this.state.dataSource[this.state.randomNum].name;
      let image_url = this.state.dataSource[this.state.randomNum].image_url;
      let categoriesRef = this.state.dataSource[this.state.randomNum].categories;
      let categories = [];
      for (let i = 0; i < categoriesRef.length; i++) {
        categories.push(categoriesRef[i].title);
      }
      let location = this.state.dataSource[this.state.randomNum].location.display_address;
      let rating = this.state.dataSource[this.state.randomNum].rating;
      let display_phone = this.state.dataSource[this.state.randomNum].display_phone;
      let coordinates = this.state.dataSource[this.state.randomNum].coordinates.latitude + "+" + this.state.dataSource[this.state.randomNum].coordinates.longitude;
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

            <TouchableHighlight
              style={styles.nextButton}>
              <Button
                title="Next&#8594;"
                color="#000"
                onPress={() => this.randomChoice()}/>
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