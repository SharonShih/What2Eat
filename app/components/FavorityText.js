//import library
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from "react-native";


//make component
const FavorText =(props)=>{
    return(
        <Text style ={styles.text}>{props.FavorText}</Text>
    )
};



const styles = StyleSheet.create({
    text:{
        flexDirection: 'row',
        color:'white',

        fontSize:28,
        paddingTop: 40,
      paddingLeft: 20,
      paddingRight: 30,
        paddingBottom: 10,
    },
})
//make component to other part of app
export default FavorText;