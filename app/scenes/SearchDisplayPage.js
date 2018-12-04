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
            url1:'',
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
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.businesses,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        let name  =[];
        let image_url=[];
        let url1;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                </View>
            )
        } else {
             name = this.state.dataSource.map((val, key) => {
               return <View key={key} style={styles.item}><Text>{val.name}</Text></View>
            });
            image_url = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.item}><Text>{val.image_url}</Text></View>
            });

            return (
                <ImageBackground source={require('../components/Stellar.png')}
                                 style={styles.Background}>
                    <Header>
                        <Left>
                            <Icon name={'menu'} onPress={() => this.props.navigation.openDrawer() }/>
                        </Left>
                    </Header>
                <View style={styles.container}>
                    {name[0]}
                    {image_url[0]}
                    <Text>{typeof image_url[0]}</Text>
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