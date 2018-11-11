import React, {Component} from 'react';
import FavorText from '../components/FavorityText';
import FoodPicture from '../components/FoodPicture';

import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ImageBackground,
} from "react-native";

var ArrayOfFood = [];
export default class HelloWorldApp extends Component {
    Constructor(){
        supper();
        this.state ={

        }
    }

    AddItemsToArray = (food) => {
        //TODO: add item to array
        Alert.alert('123');
        ArrayOfFood.push(food);
        // Showing the complete Array on Screen Using Alert.
        Alert.alert(ArrayOfFood.toString());
    }

    onPressedSubmit= ( ) => {
        //TODO:store array to firebase

        this.props.navigation.navigate("nextpage");
    }
    render() {
        const JapaneseImag={
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Breakfast_at_Tamahan_Ryokan%2C_Kyoto.jpg/2560px-Breakfast_at_Tamahan_Ryokan%2C_Kyoto.jpg'
        }
        const MexicanImag={
            uri: 'https://marvel-live.freetls.fastly.net/canvas/2018/10/4415bb555f0f407a851d3c6faaddae15?quality=95&fake=.png'
        }
        const AmricanImag={
            uri: 'https://marvel-live.freetls.fastly.net/canvas/2018/10/3eec8684f65c4e9b910c84d2191b9fcc?quality=95&fake=.png'
        }
        const KoreanImag={
            uri: 'https://i.kinja-img.com/gawker-media/image/upload/s--djYdkXK4--/c_scale,f_auto,fl_progressive,q_80,w_1600/be9vyovcn2gqwod7kd16.jpg'
        }
        const FastFood={
            uri: 'https://www.rd.com/wp-content/uploads/2017/10/15-13-things-your-fast-food-worker-won-t-tell-you-shutterstock_303995969-1024x683.jpg'
        }
        const SeaFood={
            uri: 'https://cdn.vox-cdn.com/thumbor/3m7uQhwDWw1XbhDFJN072xfu5LI=/0x0:2048x1365/1200x900/filters:focal(861x520:1187x846)/cdn.vox-cdn.com/uploads/chorus_image/image/59949587/Swift___Sons_Cold_Platter.0.jpg'
        }
        const ChineseFood={
            uri: 'https://deltaban.ir/wp-content/uploads/2018/10/veg.jpg'
        }
        const ItalianFood={
            uri: 'https://static.chaihona.ru/598525bcdc251.jpg'
        }
        const Desert={
            uri: 'https://www.askchefdennis.com/wp-content/uploads/2014/10/Fettuccine-Alfredo-2.jpg'
        }
        return (
            <ImageBackground
                source={require('../components/Stellar.png')}
                style={styles.page}>

                <FavorText FavorText={' Choose three Food You like '}/>

                <View style={styles.imageLayout}>
                    <FoodPicture FoodPicture={JapaneseImag} onPress={this.AddItemsToArray('Japanese')}/>
                    <FoodPicture FoodPicture={MexicanImag} />
                    <FoodPicture FoodPicture={AmricanImag}/>
                    <FoodPicture FoodPicture={KoreanImag}/>
                    <FoodPicture FoodPicture={FastFood}/>
                    <FoodPicture FoodPicture={SeaFood}/>
                    <FoodPicture FoodPicture={ChineseFood}/>
                    <FoodPicture FoodPicture={ItalianFood}/>
                    <FoodPicture FoodPicture={Desert}/>
                </View>

                <View style={styles.submit}>
                    <Button  onPress={() => {
                        // Alert.alert("Submit success");
                        //TODO: natvigagte to next page and pass array
                        onPressedSubmit()
                        }}
                            title="Sumbit"
                            color={'white'}
                    >
                    </Button>
                </View>
                <Text >End of page</Text>

            </ImageBackground>
        );
    }
}

const styles =StyleSheet.create({
    page:{
        backgroundColor: 'powderblue',
    },
    submit:{
        borderColor:'white',
        borderWidth: 1,
        color:'white',
    },
    imageLayout:{
        flexDirection:'row',
        flexWrap: 'wrap',
    }
})
