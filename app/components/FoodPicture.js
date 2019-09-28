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
    let imageOpacity = props.FoodSelected ? 0.2 : 1;
    // let imageOpacity = 0.2

    return(
            <TouchableOpacity
                onPress={props.onPress}
                // why need to call onpress
            >
                <Image
                    style={[styles.imageOffood,{opacity:imageOpacity}]}
                    source={props.FoodPicture}
                />
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    imageOffood:{
        width: 111,
        height: 150,
        borderColor:'white',
        borderWidth: 0,
      borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
})

export default FoodPicture;