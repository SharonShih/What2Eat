//import library
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity,
} from "react-native";


const FoodPicture=(props)=>{
    return(
            <TouchableOpacity onPress={props.onPress}>
                <Image style={styles.imageOffood} source={props.FoodPicture} onPress={()=>props.onPress}/>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    imageOffood:{
        width: 111,
        height: 150,
        borderColor:'black',
        borderWidth: 2,
        marginBottom: 10,
        marginLeft: 10,
    },
})

export default FoodPicture;