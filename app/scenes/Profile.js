import React, {Component} from 'react';
import {Header,Left,Right,Icon} from 'native-base'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";


type Props = {};
export default class Profile extends Component<Props> {
  static navigationOptions={
    drawerIcon:({tintColor})=>(
      <Icon name={'home'} style={{fontSize:24, color: tintColor}}/>
    )
  }
    render() {

        return (
            <ImageBackground
                source={ require ('../components/Stellar.png')}
                style={styles.Background}>
                <Header>
                    <Left>
                        <Icon name={'menu'} onPress={()=>this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style = {styles.ProfileForm}>
                    <Text style={styles.header}>Your Profile </Text>
                    <View style ={styles.avatar}></View>

                    <Text style = {styles.infoTitle}>Account ID</Text>
                    <View style = {styles.infoBox}>
                        <Text style={styles.info}>helloworld12345 </Text>
                    </View>
                    <Text style = {styles.infoTitle}>Email</Text>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.info}>amy_cooper12345@gmail.com</Text>
                    </View>
                    <Text style = {styles.infoTitle}>Your Tags</Text>
                    <View style =  {{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style =  {{flexDirection: 'row'}}>
                            <View style = {styles.chips}><Text style = {styles.chipText}>Chinese</Text>
                                <TouchableOpacity>
                                    <Text style={styles.chipButton}>&times;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style =  {{flexDirection: 'row'}}>
                            <View style = {styles.chips}><Text style = {styles.chipText}>Japanese</Text>
                                <TouchableOpacity>
                                    <Text style={styles.chipButton}>&times;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style =  {{flexDirection: 'row'}}>
                            <View style = {styles.chips}><Text style = {styles.chipText}>Seafood Allergic</Text>
                                <TouchableOpacity>
                                    <Text style={styles.chipButton}>&times;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style =  {{flexDirection: 'row'}}>
                            <View style = {styles.chips}><Text style = {styles.chipText}>Vegan</Text>
                                <TouchableOpacity>
                                    <Text style={styles.chipButton}>&times;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    ProfileForm: {
        alignSelf: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
    },
    Background:{
        width: '100%',
        height: '100%',
    },
    avatar:{
        backgroundColor: "#FFF",
        borderRadius: 100,
        width: 115,
        height: 115,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    header: {
        fontSize: 25,
        color: "#FFF",
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom: 5,
        marginTop:5,
    },
    infoTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    infoBox:{
        marginBottom: 20,
        height:40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomColor: '#FFF',
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth:0,
    },
    info:{
        fontSize: 20,
        color: '#FFF',
    },
    button: {
        color: '#FFF',
        opacity: 0.7,
        textAlign: 'left',
        fontSize: 23,
        marginLeft: 20,
        marginTop: 40,
    },
    chips:{
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: "#FFF",
        borderRadius: 32,
        height: 40,
        marginBottom: 10,
        marginTop: 5,
        marginRight: 10,
        flexDirection: 'row',
    },
    chipText:{
        fontSize: 18,
        color: "#FFF",
        textAlign: 'left',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    chipButton:{
        color: "#FFF",
        fontSize: 25,
        marginLeft: 5,
        marginRight: 10,
        marginBottom: 10,
    },



});