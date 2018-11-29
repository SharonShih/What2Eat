import React, {Component} from 'react';
import {Header,Left,Right,Icon} from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
} from "react-native";


class HistoryScreen extends Component{
    static navigationOptions={
        drawerIcon:({tintColor})=>(
            <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
        )
    }
    render()
    {
        return (
            <ImageBackground
                source={require ('../components/Stellar.png')}
                style={styles.Background}>
                <Header>
                    <Left>
                        <Icon name={'menu'} onPress={()=>this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style={{alignItems: 'center'}}>
                    <Text>This is History Page</Text>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    Background:{
        width: '100%',
        height: '100%',
    },
});
export default HistoryScreen

