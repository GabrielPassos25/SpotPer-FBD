import React, {useState} from 'react';
import {StyleSheet, View, Image, Text,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DropdownMenu from 'react-native-dropdown-menu';

export default function NavBar(){
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return(
        <View style= {styles.container}>
            <View style={styles.components}>
                <View style={{paddingLeft:10}}>
                    <Image source = {require('../../../assets/logo.png')} style ={{width:60,height:60}}/>
                </View>
                <Text style={styles.textlogo}>SpotPer</Text>
            </View>
            <View style={styles.components}>
                <View style ={styles.options}>
                    <Image source = {require('../../../assets/home.png')} style ={{width:24,height:24}}/>
                    <Text style={styles.textActive}>Home</Text>
                </View>
                <Text style = {{fontSize:20}}>|</Text>
                <View style={{paddingLeft:10}}/>
                <View style ={styles.options}>
                    <Image source = {require('../../../assets/faixas.png')} style ={{width:24,height:24}}/>
                    <Text style={styles.textDeactive}>Suas Faixas</Text>
                </View>
                <View style={{paddingLeft:10}}/>
                <Text style = {{fontSize:20}}>|</Text>
                <View style={{paddingLeft:10}}/>
                <View style ={styles.options}>
                    <Image source = {require('../../../assets/playlists.png')} style ={{width:24,height:24}}/>
                    <Text style={styles.textDeactive}>Suas Playlists</Text>
                </View>
                <View style={{paddingLeft:10}}/>
                <Text style = {{fontSize:20}}>|</Text>
                <View style={{paddingLeft:10}}/>
                <View style ={styles.options}>
                    <Image source = {require('../../../assets/artistas.png')} style ={{width:24,height:24}}/>
                    <Text style={styles.textDeactive}>Artistas</Text>
                </View>
            </View>
            <View style={styles.profile}>
                <View>
                    <TouchableOpacity onpress ={openMenu}>
                        <Image source = {require('../../../assets/profile.png')} style ={{width:40,height:40}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:"#D8CECE",
        alignItems:'center'
    },
    components:{
        flexDirection:'row',
         alignItems:'center',
          width:"33%"
    },
    options:{
        flexDirection:'column',
        alignItems:'center',
        width:"25%",
        justifyContent:'center'
    },
    textlogo:{
        color:'#3E6097',
        fontWeight:'bold',
        fontSize:30
    },
    textActive:{
        color:"#3E6097",
        fontWeight:'bold',
        textAlign:'center'
    },
    textDeactive:{
        color:"#374754",
        fontWeight:'bold',
        textAlign:'center'
    },
    profile:{
        paddingRight:10,
        width:"33%",
        alignItems:'flex-end'
    }
});