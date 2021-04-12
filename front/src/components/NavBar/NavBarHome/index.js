import React from 'react';
import {View, Image, Text,TouchableOpacity, Platform,StatusBar,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styleWeb from '../../../styles/web/NavBar/style'
import styleIOS from '../../../styles/iOS/NavBar/style'
import styleAndroid from '../../../styles/android/NavBar/style'

export default function NavBar(){
    const navigation = useNavigation();

    /*{Web app}*/
    if(Platform.OS === 'web'){
        return(
            <View style= {styleWeb.container}>
                <View style={styleWeb.components}>
                    <View style={{paddingLeft:10}}>
                        <Image source = {require('../../../../assets/logo.png')} style ={styleWeb.imagelogo}/>
                    </View>
                    <Text style={styleWeb.textlogo}>SpotPer</Text>
                </View>
                <View style={styleWeb.components}>
                    <TouchableOpacity style ={styleWeb.options} onPress= {()=>navigation.navigate('Home')}>
                        <View style ={styleWeb.options}>
                            <Image source = {require('../../../../assets/homeBlue.png')} style ={styleWeb.icons}/>
                            <Text style={styleWeb.textActive}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style = {{fontSize:20}}>|</Text>
                    <View style={{paddingLeft:10}}/>
                    <TouchableOpacity style ={styleWeb.options} onPress= {()=>navigation.navigate('Playlists')}>
                        <View style ={styleWeb.options}>
                            <Image source = {require('../../../../assets/playlists.png')} style ={styleWeb.icons}/>
                            <Text style={styleWeb.textDeactive}>Playlists</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{paddingLeft:10}}/>
                    <Text style = {{fontSize:20}}>|</Text>
                    <View style={{paddingLeft:10}}/>
                    <TouchableOpacity style ={styleWeb.options} onPress= {()=>navigation.navigate('Artists')}>
                        <View style ={styleWeb.options}>
                            <Image source = {require('../../../../assets/artistas.png')} style ={styleWeb.icons}/>
                            <Text style={styleWeb.textDeactive}>Artistas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styleWeb.profile}>
                    <View>
                        <TouchableOpacity onPress = {() => {
                            if(confirm('Deseja Realmente Sair?')){
                                navigation.navigate('Login')
                            }
                        }}>
                            <Image source = {require('../../../../assets/profile.png')} style ={styleWeb.profileicon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    /*{Android app}*/
    else if(Platform.OS === 'android'){
        return(
            <View>
                <StatusBar backgroundColor="#D8CECE"/>
                <ScrollView style={styleAndroid.scrollview}>
                    <View style= {styleAndroid.container}>
                        <View style={styleAndroid.components}>
                            <View style={{paddingLeft:10}}>
                                <Image source = {require('../../../../assets/logo.png')} style ={styleAndroid.logo}/>
                            </View>
                            <Text style={styleAndroid.textlogo}>SpotPer</Text>
                        </View>
                        <View style={styleAndroid.profile}>
                            <View>
                                <TouchableOpacity>
                                    <Image source = {require('../../../../assets/profile.png')} style ={styleAndroid.profile1}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

     /*{ios app}*/
     else if(Platform.OS === 'ios'){
        return(
            <View>
                <StatusBar backgroundColor="#D8CECE"/>
                <ScrollView style={styleIOS.scrollview}>
                    <View style= {styleIOS.container}>
                        <View style={styleIOS.components}>
                            <View style={{paddingLeft:10}}>
                                <Image source = {require('../../../../assets/logo.png')} style ={styleIOS.logo}/>
                            </View>
                            <Text style={styleIOS.textlogo}>SpotPer</Text>
                        </View>
                        <View style={styleIOS.profile}>
                            <View>
                                <TouchableOpacity>
                                    <Image source = {require('../../../../assets/profile.png')} style ={styleIOS.profile1}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
