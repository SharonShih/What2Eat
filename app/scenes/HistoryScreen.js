import React, {Component} from 'react';
import {Header, Left, Right, Icon} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import Firebase from "../../services/Firebase";


export default class HistoryScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name={'home'} style={{fontSize: 24, color: tintColor}}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      visited_restaurant: []
    }
  }

  // componentDidMount() {
  //   let db = Firebase.firestore(Firebase);
  //   db.settings({
  //     timestampsInSnapshots: true
  //   });
  //   let docRef = db.collection("users").doc(this.state.uid);
  //   docRef.get().then(function (doc) {
  //     if (doc.exists) {
  //       var tempArray = [];
  //       let field = doc.get('visited_restaurant');
  //       for (let index = 0; index < field.length; index++) {
  //         tempArray.push(field[index]);
  //       }
  //       this.setState({visited_restaurant: tempArray})
  //       console.log(tempArray);
  //     } else {
  //       // doc.data() will be undefined in this case
  //     }
  //   }.bind(this)).catch(function (error) {
  //     console.log("Error getting document:", error);
  //   })
  // }


  render() {
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
          <View style={{alignItems: 'center'}}>
            <Text>This is History Page</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
  },
});

