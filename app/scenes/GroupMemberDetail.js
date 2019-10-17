
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Firebase from '../../services/Firebase';
import {Header, Icon, Left} from "native-base";

//TODO: add leave group
export default class GroupMemberDetail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isGroupOwner: this.props.navigation.getParam('isGroupOwner', ''),
      haveResult: false,
      groupId: this.props.navigation.getParam('groupId', ''),
      //TODO: change it later
      groupDoc: {},
    }
  }

  navigator = () =>  {
    if (this.state.groupDoc.result) {
      console.log(this.state.groupDoc.result)
      this.props.navigation.navigate('MemberSearchDisplayPage',
        {
          groupDoc: this.state.groupDoc
        });
    }
  }

  componentDidMount() {

    //TODO: change it later
    let db = Firebase.firestore(Firebase);
    let docRef = db.collection("groups").doc(this.state.groupId);
    docRef.get()
      .then( (doc) => {
          this.setState({groupDoc: doc.data()})
      })

    let query = db.collection('groups').doc(this.state.groupId);
    let observer = query.onSnapshot(querySnapshot => {
      console.log(querySnapshot.data());
      this.setState({groupDoc: querySnapshot.data()})
      this.navigator();
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }

  render() {
    //TODO: change it later if groupDoc is passed
    let length = 0;
    if (this.state.groupDoc.groupMember) {
      length = this.state.groupDoc.groupMember.length;
    }
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

            <Text style={styles.statusText} >
              Waiting for group owner to genergate result...
            </Text>

          </View>
        </ScrollView>
      </ImageBackground>
    );
  }


}

const styles = StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
  },
  text:{
    color:'#FFF',
    fontSize: 30,
    paddingHorizontal: 60,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',

  },
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
  statusText: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
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
});