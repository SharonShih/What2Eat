import React, {Component} from 'react';
import {createDrawerNavigator, createStackNavigator, DrawerItems,} from 'react-navigation';
import 'firebase/firestore';
import {Image,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions} from "react-native";
import HistoryScreen from '../scenes/HistoryScreen';
import Profile from '../scenes/Profile';
import MainPage from '../scenes/MainPage';
import Home from '../scenes/Home'
import SearchDisplayPage from '../scenes/SearchDisplayPage';
import ChooseFavorite from '../scenes/ChooseFavorite';
import {Icon} from "native-base";
import YelpSearchRequest from "./YelpSearchRequest";

const CustomDrawComponent=(props)=>(
    <SafeAreaView style={{flex: 1}}>
        <View style={{height:150, backgroundColor: 'white',alignItems:'center', justifyContent:'center'}}>
            <Image source={require('./images.png')} style={{height:120,width:120, borderRadius: 60}}/>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

export const AppStackNavigator =  createStackNavigator({
  MainPage: MainPage,
  SearchDisplayPage: SearchDisplayPage,
  ChooseFavorite: ChooseFavorite,
  History: HistoryScreen,
  YelpSearchRequest: YelpSearchRequest
}, {
  initialPage: 'MainPage',
  headerMode: 'none',
  navigationOptions: { header: { visible: false } } // ADDED THIS
});

export const AppDrawerNavigator =createDrawerNavigator({
    MainPage: {screen: AppStackNavigator,
      navigationOptions: {
        drawerIcon:({tintColor})=>(
          <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
        )
      }},
    Profile: Profile,
    History: HistoryScreen,
    Home: Home,
},{
    contentComponent: CustomDrawComponent,
    contentOptions: {
        activateTintColor:'orange'
    }
});


