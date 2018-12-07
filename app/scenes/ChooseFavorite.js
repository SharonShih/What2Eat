import React, {Component} from 'react';
import FavorText from '../components/FavorityText';
import FoodPicture from '../components/FoodPicture';
import Firebase from '../../services/Firebase';
import 'firebase/firestore';
import {StyleSheet, View, Button, ImageBackground, TouchableHighlight,ScrollView} from "react-native";

type Props = {};
export default class ChooseFavorite extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      ArrayOfFood: [],
      click1:0,
      click2:0,
      click3:0,
      click4:0,
      click5:0,
      click6:0,
      click7:0,
      click8:0,
      click9:0,
        click10:0,
        click11:0,
        click12:0,
    }
  }

  static navigationOptions = {
    header: null
  }

  handlerButtonOnClick1(){
    this.setState({
      click1: this.state.click1+1,
    });
  }
  handlerButtonOnClick2(){
    this.setState({
      click2: this.state.click2+1,
    });
  }
  handlerButtonOnClick3(){
    this.setState({
      click3: this.state.click3+1,
    });
  }
  handlerButtonOnClick4(){
    this.setState({
      click4: this.state.click4+1,
    });
  }
  handlerButtonOnClick5(){
    this.setState({
      click5: this.state.click5+1,
    });
  }
  handlerButtonOnClick6(){
    this.setState({
      click6: this.state.click6+1,
    });
  }
  handlerButtonOnClick7(){
    this.setState({
      click7: this.state.click7+1,
    });
  }
  handlerButtonOnClick8(){
    this.setState({
      click8: this.state.click8+1,
    });
  }
  handlerButtonOnClick9(){
    this.setState({
      click9: this.state.click9+1,
    });
  }
    handlerButtonOnClick10(){
        this.setState({
            click10: this.state.click10+1,
        });
    }
    handlerButtonOnClick11(){
        this.setState({
            click11: this.state.click11+1,
        });
    }
    handlerButtonOnClick9(){
        this.setState({
            click12: this.state.click12+1,
        });
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
    var _style1;
    if (this.state.click1%2==0){ // clicked button style
      _style1 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style1 = {
        opacity: 0.2
      }
    }
    var _style2;
    if (this.state.click2%2==0){ // clicked button style
      _style2 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style2 = {
        opacity: 0.2
      }
    }
    var _style3;
    if (this.state.click3%2==0){ // clicked button style
      _style3 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style3 = {
        opacity: 0.2
      }
    }
    var _style4;
    if (this.state.click4%2==0){ // clicked button style
      _style4 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style4 = {
        opacity: 0.2
      }
    }
    var _style5;
    if (this.state.click5%2==0){ // clicked button style
      _style5 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style5 = {
        opacity: 0.2
      }
    }
    var _style6;
    if (this.state.click6%2==0){ // clicked button style
      _style6 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style6 = {
        opacity: 0.2
      }
    }
    var _style7;
    if (this.state.click7%2==0){ // clicked button style
      _style7 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style7 = {
        opacity: 0.2
      }
    }
    var _style8;
    if (this.state.click8%2==0){ // clicked button style
      _style8 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style8 = {
        opacity: 0.2
      }
    }
    var _style9;
    if (this.state.click9%2==0){ // clicked button style
      _style9 = {
        opacity: 1
      }
    }
    else{ // default button style
      _style9 = {
        opacity: 0.2
      }
    }
      var _style10;
      if (this.state.click10%2==0){ // clicked button style
          _style10 = {
              opacity: 1
          }
      }
      else{ // default button style
          _style10 = {
              opacity: 0.2
          }
      }
      var _style11;
      if (this.state.click11%2==0){ // clicked button style
          _style11 = {
              opacity: 1
          }
      }
      else{ // default button style
          _style11 = {
              opacity: 0.2
          }
      }
      var _style12;
      if (this.state.click1%2==0){ // clicked button style
          _style12 = {
              opacity: 1
          }
      }
      else{ // default button style
          _style12 = {
              opacity: 0.2
          }
      }
    return (
      <ImageBackground
        source={require('../components/Stellar.png')}
        style={styles.Background}>
        <ScrollView>
        <FavorText FavorText ={'Please Choose Your Favorite Type of Cuisines'}></FavorText>
        <View style={styles.imageLayout}>

          <View style={_style1}><FoodPicture FoodPicture={JapaneseImag} onPress={() => {this.handlerButtonOnClick1();this.AddItemsToArray('Japanese');}}/></View>
          <View style={_style2}><FoodPicture FoodPicture={MexicanImag} onPress={() => {this.handlerButtonOnClick2();this.AddItemsToArray('Mexican');}}/></View>
          <View style={_style3}><FoodPicture FoodPicture={AmricanImag} onPress={() => {this.handlerButtonOnClick3();this.AddItemsToArray('Amrican');}}/></View>
          <View style={_style4}><FoodPicture FoodPicture={FastFood} onPress={() => {this.handlerButtonOnClick4();this.AddItemsToArray('FastFood');}}/></View>
          <View style={_style5}><FoodPicture FoodPicture={SeaFood} onPress={() => {this.handlerButtonOnClick5();this.AddItemsToArray('SeaFood');}}/></View>
          <View style={_style6}><FoodPicture FoodPicture={ChineseFood} onPress={() => {this.handlerButtonOnClick6();this.AddItemsToArray('ChineseFood');}}/></View>
          <View style={_style7}><FoodPicture FoodPicture={ItalianFood} onPress={() => {this.handlerButtonOnClick7();this.AddItemsToArray('ItalianFood');}}/></View>
          <View style={_style8}><FoodPicture FoodPicture={KoreanImag} onPress={() => {this.handlerButtonOnClick8();this.AddItemsToArray('KoreanImag');}}/></View>
          <View style={_style9}><FoodPicture FoodPicture={Desert} onPress={() => {this.handlerButtonOnClick9();this.AddItemsToArray('Desert');}}/></View>
            <View style={_style10}><FoodPicture FoodPicture={Vietnamese} onPress={() => {this.handlerButtonOnClick10();this.AddItemsToArray('Vietnamese');}}/></View>
            <View style={_style11}><FoodPicture FoodPicture={Steak} onPress={() => {this.handlerButtonOnClick11();this.AddItemsToArray('Steak');}}/></View>
            <View style={_style12}><FoodPicture FoodPicture={Cafe} onPress={() => {this.handlerButtonOnClick12();this.AddItemsToArray('Cafe');}}/></View>
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