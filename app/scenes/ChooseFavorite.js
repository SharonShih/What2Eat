import React, {Component} from 'react';
import FavorText from '../components/FavorityText';
import FoodPicture from '../components/FoodPicture';
import Firebase from '../../services/Firebase';
import 'firebase/firestore';
import {StyleSheet, View, Button, ImageBackground, TouchableHighlight,ScrollView} from "react-native";
import JapaneseImag from '../image/japanese.jpg'
import MexicanImag from '../image/mexican.jpg'
import AmricanImag from '../image/american.jpg'
import KoreanImag from '../image/korean.jpg'
import FastFood from '../image/fastfood.jpg'
import SeaFood from '../image/seafood.jpg'
import ChineseFood from '../image/chinese.jpg'
import ItalianFood from '../image/italian.jpg'
import Vietnamese from '../image/vietnamese.jpg'
import Steak from '../image/steak.jpg'
import Cafe from '../image/cafe.jpg'
import Desert from '../image/dessert.jpg'



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
            <FoodPicture
              FoodPicture={JapaneseImag}
              FoodSelected={this.state.Japanese}
              onPress={() => {this.handlefavoriteType("Japanese");this.AddItemsToArray('Japanese');}}
            />
          <View>
            <FoodPicture
              FoodPicture={KoreanImag}
              FoodSelected={this.state.Korean}
              onPress={() => {this.handlefavoriteType("Korean");this.AddItemsToArray('Korean');}}/>
          </View>

          <View>
            <FoodPicture
              FoodPicture={AmricanImag}
              FoodSelected={this.state.Amrican}
              onPress={() => {this.handlefavoriteType("Amrican");this.AddItemsToArray('Amrican');}}/>
          </View>


          <View >
            <FoodPicture
              FoodPicture={ItalianFood}
              FoodSelected={this.state.ItalianFood}
              onPress={() => {this.handlefavoriteType("ItalianFood");this.AddItemsToArray('ItalianFood');}}/>
          </View>

          <View>
            <FoodPicture
              FoodPicture={MexicanImag}
              FoodSelected={this.state.Mexican}
              onPress={() => {this.handlefavoriteType("Mexican");this.AddItemsToArray('Mexican');}}
            />
          </View>

          <View >
            <FoodPicture
              FoodPicture={SeaFood}
              FoodSelected={this.state.SeaFood}
              onPress={() => {this.handlefavoriteType("SeaFood");this.AddItemsToArray('SeaFood');}}/>
          </View>
          
          <View >
            <FoodPicture
              FoodPicture={FastFood}
              FoodSelected={this.state.FastFood}
              onPress={() => {this.handlefavoriteType("FastFood");this.AddItemsToArray('FastFood');}}/>
          </View>

          <View >
            <FoodPicture
              FoodPicture={ChineseFood}
              FoodSelected={this.state.ChineseFood}
              onPress={() => {this.handlefavoriteType("ChineseFood");this.AddItemsToArray('ChineseFood');}}/>
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

          <View>
            <FoodPicture
              FoodPicture={Desert}
              FoodSelected={this.state.Desert}
              onPress={() => {this.handlefavoriteType("Desert");this.AddItemsToArray('Desert');}}/>
          </View>
          
          
          
        </View>

        <TouchableHighlight
          style ={styles.submit}>
          <Button
            title="Submit"
            color="#FFF"
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
    height: 60,
    width: 250,
    borderRadius: 30,
    backgroundColor: "black",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
    paddingTop: 10,
  },
  imageLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})