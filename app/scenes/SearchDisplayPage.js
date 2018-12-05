import React, {Component} from 'react';
import { YelpAuth } from '../../services/YelpFusion';
import {Alert, ImageBackground,Image} from "react-native";
import {StyleSheet, Text, View, Button} from 'react-native';
import {Header, Icon, Left} from "native-base";

export default class YelpSearchRequest extends Component<Props> {
    static navigationOptions={
        drawerIcon:({tintColor})=>(
            <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            searchInfo: this.props.navigation.getParam('searchInfo', '')

        }
    }

    componentDidMount () {
        return fetch(this.state.searchInfo, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + YelpAuth,
            }
        })
            .then ( (response) => response.json() )
            .then( (responseJson) => {
              var min=0;
              var max= responseJson.businesses.length;
              var random =Math.floor(Math.random() * (+max - +min)) + +min;
              console.log(responseJson.businesses.length);
              console.log("random:" + String(random));
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.businesses[random],
                    randomNum: random,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                </View>
            )
        } else {
            let name = this.state.dataSource.name;
            let image_url = this.state.dataSource.image_url;
            return (
                <ImageBackground source={require('../components/Stellar.png')}
                                 style={styles.Background}>
                    <Header>
                        <Left>
                            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer() }/>
                        </Left>
                    </Header>
                <View style={styles.container}>
                    <Text>{name}</Text>
                  <Image source={{uri: image_url}}
                         style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
                </View>
                </ImageBackground>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    Background: {
        width: '100%',
        height: '100%',
    },
});