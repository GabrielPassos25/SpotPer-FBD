import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import {View, Image, Text, TouchableOpacity, TextInput, Platform, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import styleWeb from '../../styles/web/Login/style'
import styleAndroid from '../../styles/android/Login/style'
import styleIOS from '../../styles/iOS/Login/style'

export default function ResetPassword(){
    const navigation = useNavigation();
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const [visivel, setVisivel] = useState(true);

    if(Platform.OS == 'web'){
        return(
            <View style= {styleWeb.container}>
                <View style = {styleWeb.container1}>
                    <View style = {styleWeb.containerImage}>
                        <Image source = {require('../../../assets/ResetPassword.png')} style={styleWeb.image}/>
                    </View>
                </View>
                <View style = {styleWeb.container2}>
                    <View style = {styleWeb.containerLogo}>
                        <Image source = {require('../../../assets/logo.png')} style={styleWeb.logo}/>
                        <Text style ={styleWeb.title}>Recuperar Senha</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Vamos lhe ajudar a recuperar sua conta!</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Para isso, basta inserir uma nova senha!</Text>
                        <View style={{paddingTop:10}}/>
                            <View style ={styleWeb.componentsEye}>
                                <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                    <Entypo name="eye" size={24} color="black"/>
                                </TouchableOpacity>
                            </View>
                          <TextInput
                            onChangeText={setPassword}
                            value={password}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styleWeb.input}
                            placeholder="Senha"
                          />                      
                        <View style={{paddingTop:10}}/>
                        
                        <View style={{paddingTop:10}}/>
                          <TextInput
                            onChangeText={setConfirmpassword}
                            value={confirmpassword}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styleWeb.input}
                            placeholder="Confirmar Senha"
                            secureTextEntry = {visivel}
                          />
                        <View style={{paddingTop:10}}/>
                        <TouchableOpacity style = {styleWeb.buttom} onPress={()=>{navigation.navigate('Login'); alert('Senha redefinida com sucesso!')}}>
                            <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Redefinir Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    else if(Platform.OS === 'android'){
        return(
            <SafeAreaView>
                <StatusBar backgroundColor="#F3F3F3"/>
                <ScrollView style={{width:"100%", height:"100%"}}>
                    <View style= {styleAndroid.container}>
                        <View style = {styleAndroid.container2}>
                            <View style = {styleAndroid.containerLogo}>
                                <Image source = {require('../../../assets/logo.png')} style={styleAndroid.logo}/>
                                <Text style ={styleAndroid.title}>Login</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Insira suas credenciais abaixo para realizar o login na plataforma.</Text>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleAndroid.componentsEye}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                                        <Text style ={styleAndroid.forgotPassword}>Ainda não possui cadastro?</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    onChangeText={setEmail}
                                    value={email}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleAndroid.input}
                                    placeholder="Email"
                                />                      
                                <View style={{paddingTop:10}}/>
                                <View style ={styleAndroid.componentsEye}>
                                <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                    <Entypo name="eye" size={24} color="black"/>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TextInput
                                    onChangeText={setPassword}
                                    value={password}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleAndroid.input}
                                    placeholder="Senha"
                                    secureTextEntry = {visivel}
                                />
                                <View style={{paddingTop:10}}/>
                                <View style ={styleAndroid.componentsEye}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                                        <Text style ={styleAndroid.forgotPassword}>Esqueceu a Senha?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TouchableOpacity style = {styleAndroid.buttom} onPress={()=>login()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    else if(Platform.OS === 'ios'){
        return(
            <SafeAreaView>
                <StatusBar backgroundColor="#F3F3F3"/>
                <ScrollView style={{width:"100%", height:"100%"}}>
                    <View style= {styleIOS.container}>
                        <View style = {styleIOS.container2}>
                            <View style = {styleIOS.containerLogo}>
                                <Image source = {require('../../../assets/logo.png')} style={styleIOS.logo}/>
                                <Text style ={styleIOS.title}>Login</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Insira suas credenciais abaixo para realizar o login na plataforma.</Text>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleIOS.componentsEye}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                                        <Text style ={styleIOS.forgotPassword}>Ainda não possui cadastro?</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    onChangeText={setEmail}
                                    value={email}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleIOS.input}
                                    placeholder="Email"
                                />                      
                                <View style={{paddingTop:10}}/>
                                <View style ={styleIOS.componentsEye}>
                                <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                    <Entypo name="eye" size={24} color="black"/>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TextInput
                                    onChangeText={setPassword}
                                    value={password}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styleIOS.input}
                                    placeholder="Senha"
                                    secureTextEntry = {visivel}
                                />
                                <View style={{paddingTop:10}}/>
                                <View style ={styleIOS.componentsEye}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                                        <Text style ={styleIOS.forgotPassword}>Esqueceu a Senha?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TouchableOpacity style = {styleIOS.buttom} onPress={()=>login()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}