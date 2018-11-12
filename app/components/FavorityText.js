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
        fontWeight: 'bold',
        fontSize:28,
        paddingTop: 70,
        paddingBottom: 30,
    },
})
//make component to other part of app
export default FavorText;