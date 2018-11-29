import React, {Component} from 'react';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';

import 'firebase/firestore';
import {Image,
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions} from "react-native";
import HistoryScreen from '../scenes/HistoryScreen';
import Profile from './Profile'

const Navigator =()=>{
    return(
        <AppDrawerNavigator/>
    )
};

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
const AppDrawerNavigator =createDrawerNavigator({
    Profile: Profile,
    History: HistoryScreen,
},{
    contentComponent: CustomDrawComponent,
    contentOptions: {
        activateTintColor:'orange'
    }
})


export default Navigator;