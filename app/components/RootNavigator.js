import React from 'react';
import {createDrawerNavigator, createStackNavigator, DrawerItems,} from 'react-navigation';
import 'firebase/firestore';
import {
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import HistoryScreen from '../scenes/HistoryScreen';
import Profile from '../scenes/Profile';
import MainPage from '../scenes/MainPage';
import SearchDisplayPage from '../scenes/SearchDisplayPage';
import ChooseFavorite from '../scenes/ChooseFavorite';
import {Icon} from "native-base";
import YelpSearchRequest from "./YelpSearchRequest";
import Logout from '../scenes/Logout';
import GroupPage from '../scenes/GroupPage';
import GroupOwnerDetail from "../scenes/GroupOwnerDetail";
import GroupMemberDetail from "../scenes/GroupMemberDetail";
import MemberSearchDisplayPage from "../scenes/MemberSearchDisplayPage";

const CustomDrawComponent = (props) => (
  <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
    <View style={{height: 150, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('./w2e_logo.png')} style={{ borderRadius: 0}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

//main stack navigator of the app
//TODO: separate them into different stack navigator from their function
export const AppStackNavigator = createStackNavigator({
  MainPage: MainPage,
  SearchDisplayPage: SearchDisplayPage,
  ChooseFavorite: ChooseFavorite,
  YelpSearchRequest: YelpSearchRequest,
}, {
  initialPage: 'MainPage',
  headerMode: 'none',
  navigationOptions: {header: {visible: false}} // ADDED THIS
});

//stack navigator handle group feature
export const GroupStackNavigator = createStackNavigator({
  Group: GroupPage,
  GroupOwnerDetail: GroupOwnerDetail,
  GroupMemberDetail: GroupMemberDetail,
  MemberSearchDisplayPage: MemberSearchDisplayPage,
}, {
  initialPage: 'GroupPage',
  headerMode: 'none',
  navigationOptions: {header: {visible: false}} // ADDED THIS
});

//main menu drawer navigator
export const AppDrawerNavigator = createDrawerNavigator({
  MainPage: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon name={'md-home'} style={{fontSize: 24, color: 'purple'}}/>
      )
    }
  },
  Profile: Profile,
  History: HistoryScreen,
  Group: {
    screen: GroupStackNavigator,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon type={"FontAwesome"} name={'group'} style={{fontSize: 24, color: 'purple'}}/>
      )
    }
  },
  Logout: Logout,
}, {
  contentComponent: CustomDrawComponent,
  contentOptions: {
    activeBackgroundColor: '#9b989c',


    labelStyle: {
      color: 'purple',
    },
  }
});

