import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import {View, Image, Text, TouchableOpacity, TextInput, Platform, SafeAreaView, StatusBar} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import styleWeb from '../../styles/web/Register/style'
import styleAndroid from '../../styles/android/Register/style'
import styleIOS from '../../styles/iOS/Register/style'
import { getUser, registerUser } from '../../../service/api';

export default function Register(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [visivel, setVisivel] = useState(true);
    
    const createUser = () => {
        if(!password || password.length < 6){
            alert("Senha inválida!\nA senha deve conter no mínimo 6 caracteres.");
            return
        }
        else if(password != ConfirmPassword){
            alert("Senha inválida!\nAs senhas devem ser iguais.");
            return
        }
        registerUser(email, username || 'user', password, res=>{
            if(res.message == 'Ok'){
                alert("Usuário criado com sucesso!")
                navigation.navigate('Login')
            }else alert(res.message)
        })
    }
    if(Platform.OS === 'web'){
        return(
            <View style= {styleWeb.container}>
                <View style = {styleWeb.container1}>
                    <View style = {styleWeb.containerImage}>
                        <Image source = {require('../../../assets/imageRegister.png')} style={styleWeb.image}/>
                    </View>
                </View>
                <View style = {styleWeb.container2}>
                    <View style = {styleWeb.containerLogo}>
                        <Image source = {require('../../../assets/logo.png')} style={styleWeb.logo}/>
                        <Text style ={styleWeb.title}>Registro</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Seja bem-vindo ao SpotPer!</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styleWeb.texts}>Insira suas credenciais abaixo para realizar o cadastro na plataforma.</Text>
                        <View style={{paddingTop:10}}/>
                        <View style = {styleWeb.email}>
                            <TextInput
                                onChangeText={setEmail}
                                value={email}
                                color='black'
                                backgroundColor= '#FFFFFF'
                                style = {styleWeb.input}
                                placeholder="Email"
                            />
                        </View>
                        <View style={{paddingTop:10}}/>
                        <View style ={styleWeb.components}>
                        <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                            <Entypo name="eye" size={24} color="black"/>
                        </TouchableOpacity>
                        </View>
                        <View style={{paddingTop:10}}/>
                        <View style = {styleWeb.passwordField}>
                            <TextInput
                                onChangeText={setPassword}
                                value={password}
                                color='black'
                                backgroundColor= '#FFFFFF'
                                style = {styleWeb.input}
                                placeholder="Senha"
                                secureTextEntry = {visivel}
                            />
                            <View style={{paddingLeft:40}}/>
                            <TextInput
                                onChangeText={setConfirmPassword}
                                value={ConfirmPassword}
                                color='black'
                                backgroundColor= '#FFFFFF'
                                style = {styleWeb.input}
                                placeholder="Confirmar Senha"
                                secureTextEntry = {visivel}
                            />
                        </View>
                        <View style={{paddingTop:10}}/>
                        <View style ={styleWeb.components}>
                          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                              <Text style ={{color:"#3E6097", fontWeight:'bold', fontSize:16}}>Já possui cadastro?</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{paddingTop:10}}/>
                        <TouchableOpacity style = {styleWeb.buttom} onPress={()=>createUser()}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Registrar</Text>
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
                                <Text style ={styleAndroid.title}>Registro</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleAndroid.texts}>Insira suas credenciais abaixo para realizar o cadastro na plataforma.</Text>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleAndroid.email}>
                                    <TextInput
                                        onChangeText={setEmail}
                                        value={email}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleAndroid.input}
                                        placeholder="Email"
                                    />
                                </View>
                                <View style={{paddingTop:10}}/>
                                <View style ={styleAndroid.components}>
                                <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                    <Entypo name="eye" size={24} color="black"/>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleAndroid.passwordField}>
                                    <TextInput
                                        onChangeText={setPassword}
                                        value={password}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleAndroid.input}
                                        placeholder="Senha"
                                        secureTextEntry = {visivel}
                                    />
                                </View>
                                <View style={{paddingLeft:40, paddingTop:10}}/>
                                <View style = {styleAndroid.passwordField}>
                                    <TextInput
                                        onChangeText={setConfirmPassword}
                                        value={ConfirmPassword}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleAndroid.input}
                                        placeholder="Confirmar Senha"
                                        secureTextEntry = {visivel}
                                    />                            
                                </View>
                                <View style={{paddingLeft:40}}/>
                                <View style={{paddingTop:10}}/>
                                <View style ={styleAndroid.components}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style ={{color:"#3E6097", fontWeight:'bold', fontSize:16}}>Já possui cadastro?</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TouchableOpacity style = {styleAndroid.buttom} onPress={()=>createUser()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Registrar</Text>
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
                                <Text style ={styleIOS.title}>Registro</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styleIOS.texts}>Insira suas credenciais abaixo para realizar o cadastro na plataforma.</Text>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleIOS.email}>
                                    <TextInput
                                        onChangeText={setEmail}
                                        value={email}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleIOS.input}
                                        placeholder="Email"
                                    />
                                </View>
                                <View style={{paddingTop:10}}/>
                                <View style ={styleIOS.components}>
                                <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                                    <Entypo name="eye" size={24} color="black"/>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <View style = {styleIOS.passwordField}>
                                    <TextInput
                                        onChangeText={setPassword}
                                        value={password}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleIOS.input}
                                        placeholder="Senha"
                                        secureTextEntry = {visivel}
                                    />
                                </View>
                                <View style={{paddingLeft:40, paddingTop:10}}/>
                                <View style = {styleIOS.passwordField}>
                                    <TextInput
                                        onChangeText={setConfirmPassword}
                                        value={ConfirmPassword}
                                        color='black'
                                        backgroundColor= '#FFFFFF'
                                        style = {styleIOS.input}
                                        placeholder="Confirmar Senha"
                                        secureTextEntry = {visivel}
                                    />                            
                                </View>
                                <View style={{paddingLeft:40}}/>
                                <View style={{paddingTop:10}}/>
                                <View style ={styleIOS.components}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style ={{color:"#3E6097", fontWeight:'bold', fontSize:16}}>Já possui cadastro?</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{paddingTop:10}}/>
                                <TouchableOpacity style = {styleIOS.buttom} onPress={()=>createUser()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Registrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}