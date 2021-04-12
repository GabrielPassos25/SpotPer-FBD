import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import {View, Image, Text, TouchableOpacity, TextInput, Platform, SafeAreaView, StatusBar} from 'react-native';
import { auth } from '../../../firebase';
import { sendResetRequest } from '../../../service/api';
import { ScrollView } from 'react-native-gesture-handler';
import styleWeb from '../../styles/web/ForgotPassword/style'
import styleAndroid from '../../styles/android/ForgotPassword/style'
import styleIOS from '../../styles/iOS/ForgotPassword/style'

export default function ForgotPassword(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    
    const ResetPassword = () =>{
        sendResetRequest(email, res=>{
            if(res.message == 'Ok'){
                alert('Um email foi enviado para você com o link para resetar sua senha!')
                navigation.navigate('Login')
            }else alert(res.message)
        })
    }

    /*{Web app}*/
    if(Platform.OS === 'web'){
        return(
            <View style= {styleWeb.container}>
                <View style = {styleWeb.container1}>
                    <View style = {styleWeb.containerImage}>
                        <Image source = {require('../../../assets/imageLogin.png')} style={styleWeb.image}/>
                    </View>
                </View>
                <View style = {styleWeb.container2}>
                    <View style = {styleWeb.containerLogo}>
                        <Image source = {require('../../../assets/logo.png')} style={styleWeb.logo}/>
                        <Text style ={styleWeb.title}>Redefinição de Senha</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Seja bem-vindo ao SpotPer!</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Vamos lhe ajudar a recuperar sua senha! Basta colocar seu email abaixo.</Text>
                        <View style={{paddingTop:10}}/>
                          <TextInput
                            onChangeText={setEmail}
                            value={email}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styleWeb.input}
                            placeholder="Email"
                          />                      
                        <View style={{paddingTop:10}}/>
                        <View style ={styleWeb.components}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            <Text style ={styleWeb.forgotPassword}>Voltar</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style = {styleWeb.buttom} onPress={()=>ResetPassword()}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Redefinir Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    /*{Android app}*/
    else if(Platform.OS === 'android'){
        return(
            <SafeAreaView>
                <StatusBar backgroundColor="#F3F3F3"/>
                <ScrollView style={styleAndroid.scrollview}>
                    <View style= {styleAndroid.container}>
                        <View style = {styleAndroid.container2}>
                            <View style = {styleAndroid.containerLogo}>
                                <Image source = {require('../../../assets/logo.png')} style={styleAndroid.logo}/>
                                <Text style ={styleAndroid.title}>Redefinição de Senha</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Vamos lhe ajudar a recuperar sua senha! Basta colocar seu email abaixo.</Text>
                                <View style={{paddingTop:10}}/>
                                <TextInput
                                    onChangeText={setEmail}
                                    value={email}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleAndroid.input}
                                    placeholder="Email"
                                />                      
                                <View style={{paddingTop:10}}/>
                                <View style ={styleAndroid.components}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style ={styleAndroid.forgotPassword}>Voltar</Text>
                                </TouchableOpacity>
                                </View>
                                <TouchableOpacity style = {styleAndroid.buttom} onPress={()=>ResetPassword()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Redefinir Senha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }    

    /*{ios app}*/
    else if(Platform.OS === 'ios'){
        return(
            <SafeAreaView>
                <StatusBar backgroundColor="#F3F3F3"/>
                <ScrollView style={styleIOS.scrollview}>
                    <View style= {styleIOS.container}>
                        <View style = {styleIOS.container2}>
                            <View style = {styleIOS.containerLogo}>
                                <Image source = {require('../../../assets/logo.png')} style={styleIOS.logo}/>
                                <Text style ={styleIOS.title}>Redefinição de Senha</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Vamos lhe ajudar a recuperar sua senha! Basta colocar seu email abaixo.</Text>
                                <View style={{paddingTop:10}}/>
                                <TextInput
                                    onChangeText={setEmail}
                                    value={email}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleIOS.input}
                                    placeholder="Email"
                                />                      
                                <View style={{paddingTop:10}}/>
                                <View style ={styleIOS.components}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style ={styleIOS.forgotPassword}>Voltar</Text>
                                </TouchableOpacity>
                                </View>
                                <TouchableOpacity style = {styleIOS.buttom} onPress={()=>ResetPassword()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Redefinir Senha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }    
}