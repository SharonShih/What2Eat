import React, {Component} from 'react';
import FavorText from '../components/FavorityText';
import FoodPicture from '../components/FoodPicture';
import Firebase from '../../services/Firebase';
import 'firebase/firestore';
import {StyleSheet, View, Button, ImageBackground, TouchableHighlight,ScrollView} from "react-native";

const JapaneseImag = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Breakfast_at_Tamahan_Ryokan%2C_Kyoto.jpg/2560px-Breakfast_at_Tamahan_Ryokan%2C_Kyoto.jpg'
}
const MexicanImag = {
  uri: 'https://marvel-live.freetls.fastly.net/canvas/2018/10/4415bb555f0f407a851d3c6faaddae15?quality=95&fake=.png'
}
const AmricanImag = {
  uri: 'https://s3-us-west-2.amazonaws.com/ncs-ons10-us-west-2-159685838580-content-prd/ns1or_wt1_p/s3fs-public/styles/cf_medium_teaser_320x180/public/Image_cont_c925eca7fba207d470efc1999e422dee6440c41d.jpeg'
}
const KoreanImag = {
  uri: 'https://i.kinja-img.com/gawker-media/image/upload/s--djYdkXK4--/c_scale,f_auto,fl_progressive,q_80,w_1600/be9vyovcn2gqwod7kd16.jpg'
}
const FastFood = {
  uri: 'https://www.rd.com/wp-content/uploads/2017/10/15-13-things-your-fast-food-worker-won-t-tell-you-shutterstock_303995969-1024x683.jpg'
}
const SeaFood = {
  uri: 'https://cdn.vox-cdn.com/thumbor/3m7uQhwDWw1XbhDFJN072xfu5LI=/0x0:2048x1365/1200x900/filters:focal(861x520:1187x846)/cdn.vox-cdn.com/uploads/chorus_image/image/59949587/Swift___Sons_Cold_Platter.0.jpg'
}
const ChineseFood = {
  uri: 'https://deltaban.ir/wp-content/uploads/2018/10/veg.jpg'
}
const ItalianFood = {
  uri: 'https://static.chaihona.ru/598525bcdc251.jpg'
}
const Desert = {
  uri: 'https://www.askchefdennis.com/wp-content/uploads/2014/10/Fettuccine-Alfredo-2.jpg'
}
  const Vietnamese = {
      uri: 'https://livingnomads.com/wp-content/uploads/2017/06/13/prawn-rice-paper-rolls-vietnamese-cuisine.jpg'
  }
  const Steak = {
      uri: 'https://buffalorunranch.com/wp-content/uploads/2017/08/ribeye-1.jpg'
  }
  const Cafe = {
      uri: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/0e/61/91/cafe-amore.jpg'
  }
export default class ChooseFavorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ArrayOfFood: [],
      Japanese: false,
      Mexican: false,
      Amrican: false,
      Korean: false,
      FastFood: false,
      SeaFood: false,
      ChineseFood: false,
      ItalianFood: false,
      Desert: false,
      Vietnamese: false,
      Steak: false,
      Cafe: false,
    }
  }

  static navigationOptions = {
    header: null
  }
  handlefavoriteType = (param) => {
    if (param === "Japanese"){
      this.setState({
        Japanese: !this.state.Japanese,
      })
    } else if (param === "Mexican") {
      this.setState({
        Mexican: !this.state.Mexican,
      })
    } else if (param === "Amrican") {
        this.setState({
            Amrican: !this.state.Amrican ,
        })
    } else if (param === "Korean") {
        this.setState({
            Korean: !this.state.Korean ,
        })
    } else if (param === "FastFood") {
        this.setState({
            FastFood: !this.state.FastFood ,
        })
    } else if (param === "SeaFood") {
        this.setState({
            SeaFood: !this.state.SeaFood ,
        })
    } else if (param === "ChineseFood") {
        this.setState({
            ChineseFood: !this.state.ChineseFood ,
        })
    } else if (param === "ItalianFood") {
        this.setState({
            ItalianFood: !this.state.ItalianFood ,
        })
    } else if (param === "Desert") {
        this.setState({
            Desert: !this.state.Desert ,
        })
    } else if (param === "Vietnamese") {
        this.setState({
            Vietnamese: !this.state.Vietnamese ,
        })
    } else if (param === "Steak") {
        this.setState({
            Steak: !this.state.Steak ,
        })
    } else if (param === "Cafe") {
        this.setState({
            Cafe: !this.state.Cafe  ,
        })
    }


  }



  AddItemsToArray = (food) => {
    if(!this.state.ArrayOfFood.includes(food))
    {
      this.state.ArrayOfFood.push(food);
    }
  }

  onPressedSubmit = () => {
    let uid = Firebase.auth().currentUser.uid;
    let db = Firebase.firestore(Firebase);
    db.settings({
      timestampsInSnapshots: true
    });

    db.collection("users").doc(uid).update(
      {
        preference: this.state.ArrayOfFood,
      }
    ).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    this.setState ({ArrayOfFood: []});
    this.props.navigation.navigate('MainPage');
  }

  render() {
    


    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <ScrollView>
        <FavorText FavorText ={'Please Choose Your Favorite Type of Cuisines'}/>

        <View style={styles.imageLayout}>
          <View >
            <FoodPicture
              FoodPicture={JapaneseImag}
              FoodSelected={this.state.Japanese}
              onPress={() => {this.handlefavoriteType("Japanese");this.AddItemsToArray('Japanese');}}
            />
            </View>
            <View>
              <FoodPicture
                FoodPicture={MexicanImag}
                FoodSelected={this.state.Mexican}
                onPress={() => {this.handlefavoriteType("Mexican");this.AddItemsToArray('Mexican');}}
              />
            </View>
          <View>
            <FoodPicture
              FoodPicture={AmricanImag}
              FoodSelected={this.state.Amrican}
              onPress={() => {this.handlefavoriteType("Amrican");this.AddItemsToArray('Amrican');}}/>
          </View>
          <View >
            <FoodPicture
              FoodPicture={FastFood}
              FoodSelected={this.state.FastFood}
              onPress={() => {this.handlefavoriteType("FastFood");this.AddItemsToArray('FastFood');}}/>
          </View>
          <View >
            <FoodPicture
              FoodPicture={SeaFood}
              FoodSelected={this.state.SeaFood}
              onPress={() => {this.handlefavoriteType("SeaFood");this.AddItemsToArray('SeaFood');}}/>
          </View>
          <View >
            <FoodPicture
              FoodPicture={ChineseFood}
              FoodSelected={this.state.ChineseFood}
              onPress={() => {this.handlefavoriteType("ChineseFood");this.AddItemsToArray('ChineseFood');}}/>
          </View>
          <View >
            <FoodPicture
              FoodPicture={ItalianFood}
              FoodSelected={this.state.ItalianFood}
              onPress={() => {this.handlefavoriteType("ItalianFood");this.AddItemsToArray('ItalianFood');}}/>
          </View>
          <View>
            <FoodPicture
              FoodPicture={KoreanImag}
              FoodSelected={this.state.Korean}
              onPress={() => {this.handlefavoriteType("Korean");this.AddItemsToArray('Korean');}}/>
          </View>
          <View>
            <FoodPicture
              FoodPicture={Desert}
              FoodSelected={this.state.Desert}
              onPress={() => {this.handlefavoriteType("Desert");this.AddItemsToArray('Desert');}}/>
          </View>
          <View>
            <FoodPicture
              FoodPicture={Vietnamese}
              FoodSelected={this.state.Vietnamese}
              onPress={() => {this.handlefavoriteType("Vietnamese");this.AddItemsToArray('Vietnamese');}}/>
          </View>
          <View>
            <FoodPicture
              FoodPicture={Steak}
              FoodSelected={this.state.Steak}
              onPress={() => {this.handlefavoriteType("Steak");this.AddItemsToArray('Steak');}}/>
          </View>
          <View>
            <FoodPicture
              FoodPicture={Cafe}
              FoodSelected={this.state.Cafe}
              onPress={() => {this.handlefavoriteType("Cafe");this.AddItemsToArray('Cafe');}}/>
          </View>
        </View>

        <TouchableHighlight
          style ={styles.submit}>
          <Button
            title="Submit"
            color="#5A6978"
            onPress={() => this.onPressedSubmit()} />
        </TouchableHighlight>
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
  submit:{
    height: 45,
    width: 250,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  imageLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})