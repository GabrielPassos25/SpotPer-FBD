import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Platform, SafeAreaView, StatusBar} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

export default function ForgotPassword(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    
    const ResetPassword = () =>{
        try{
            auth.sendPasswordResetEmail(email)
                .then(function (user){
                alert('Email enviado!','Verifique sua caixa de entrada para realizar a mudança da senha!')
                })
                .catch(error => {
                    switch(error.code){
                        case 'auth/email-already-in-use':
                            alert('Email já está cadastrado!','O email informado já está cadastrado em nosso sistema!')
                            break;
                        case 'auth/invalid-email':
                            alert('Email inexistente!','Por favor, verifique o email digitado e tente novamente!');
                    }       
                })
        }catch(e){
           alert("Erro")
        }
    }
    if(Platform.OS === 'web'){
        return(
            <View style= {styles.container}>
                <View style = {styles.container1}>
                    <View style = {styles.containerImage}>
                        <Image source = {require('../../../assets/imageLogin.png')} style={styles.image}/>
                    </View>
                </View>
                <View style = {styles.container2}>
                    <View style = {styles.containerLogo}>
                        <Image source = {require('../../../assets/logo.png')} style={styles.logo}/>
                        <Text style ={styles.title}>Redefinição de Senha</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styles.texts}>Seja bem-vindo ao SpotPer!</Text>
                        <View style={{paddingTop:10}}/>
                        <Text style ={styles.texts}>Vamos lhe ajudar a recuperar sua senha! Basta colocar seu email abaixo.</Text>
                        <View style={{paddingTop:10}}/>
                          <TextInput
                            onChangeText={setEmail}
                            value={email}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styles.input}
                            placeholder="Email"
                          />                      
                        <View style={{paddingTop:10}}/>
                        <View style ={styles.components}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            <Text style ={styles.forgotPassword}>Voltar</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style = {styles.buttom} onPress={()=>ResetPassword()}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Redefinir Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    else if(Platform.OS === 'android' || Platform.OS === 'ios'){
        return(
            <SafeAreaView>
                <StatusBar backgroundColor="#F3F3F3"/>
                <ScrollView style={{width:"100%", height:"100%"}}>
                    <View style= {styles.container}>
                        <View style = {styles.container2}>
                            <View style = {styles.containerLogo}>
                                <Image source = {require('../../../assets/logo.png')} style={styles.logo}/>
                                <Text style ={styles.title}>Redefinição de Senha</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styles.texts}>Seja bem-vindo ao SpotPer!</Text>
                                <View style={{paddingTop:10}}/>
                                <Text style ={styles.texts}>Vamos lhe ajudar a recuperar sua senha! Basta colocar seu email abaixo.</Text>
                                <View style={{paddingTop:10}}/>
                                <TextInput
                                    onChangeText={setEmail}
                                    value={email}
                                    color='black'
                                    backgroundColor= '#FFFFFF'
                                    style = {styles.input}
                                    placeholder="Email"
                                />                      
                                <View style={{paddingTop:10}}/>
                                <View style ={styles.components}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text style ={styles.forgotPassword}>Voltar</Text>
                                </TouchableOpacity>
                                </View>
                                <TouchableOpacity style = {styles.buttom} onPress={()=>ResetPassword()}>
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

const styles = StyleSheet.create({
    ...Platform.select({
        ios:{
            container:{
                flex:1,
                flexDirection:'row',
            },
            container1:{
                flex:1,
                backgroundColor:"#D8CECE"
            },
            container2:{
                flex:1,
                backgroundColor:"#F3F3F3"
                
            },
            containerImage:{
                width:"100%",
                height:"100%",
                justifyContent:'center',
                alignItems:'center'
            },
            image:{
                flex:1,
                width: "60%",
            },
            logo:{
                width:"20%",
                height:100,
            },
            containerLogo:{
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                paddingTop:40
            },
            input:{
                borderColor:"#3E6097",
                borderWidth:3,
                borderRadius:10,
                padding:10,
                width:"90%",
            },
            buttom:{
                backgroundColor:'#3E6097',
                width:"50%",
                alignItems:'center',
                borderRadius:10,
                padding:10
            },
            componentsEye:{
                width:"90%",
                alignItems:'flex-end',
            },
            components:{
                width:"90%",
                alignItems:'flex-end',
            },
            title:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:40,
                textAlign:'center'
            },
            texts:{
                color:"#374754",
                textAlign:'center',
                fontSize:18
            },
            forgotPassword:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:16
            }
        },
        android:{
            container:{
                flex:1,
                flexDirection:'row',
            },
            container1:{
                flex:1,
                backgroundColor:"#D8CECE"
            },
            container2:{
                flex:1,
                backgroundColor:"#F3F3F3"
                
            },
            containerImage:{
                width:"100%",
                height:"100%",
                justifyContent:'center',
                alignItems:'center'
            },
            image:{
                flex:1,
                width: "60%",
            },
            logo:{
                width:"20%",
                height:100,
            },
            containerLogo:{
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                paddingTop:40
            },
            input:{
                borderColor:"#3E6097",
                borderWidth:3,
                borderRadius:10,
                padding:10,
                width:"90%",
            },
            buttom:{
                backgroundColor:'#3E6097',
                width:"50%",
                alignItems:'center',
                borderRadius:10,
                padding:10
            },
            componentsEye:{
                width:"90%",
                alignItems:'flex-end',
            },
            components:{
                width:"90%",
                alignItems:'flex-end',
            },
            title:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:40,
                textAlign:'center'
            },
            texts:{
                color:"#374754",
                textAlign:'center',
                fontSize:18
            },
            forgotPassword:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:16
            }
        },
        web:{
            container:{
                flex:1,
                flexDirection:'row',
            },
            container1:{
                flex:1,
                backgroundColor:"#D8CECE"
            },
            container2:{
                flex:1,
                backgroundColor:"#F3F3F3"
                
            },
            containerImage:{
                width:"100%",
                height:"100%",
                justifyContent:'center',
                alignItems:'center'
            },
            image:{
                flex:1,
                width: "60%",
                resizeMode:'contain'
            },
            logo:{
                width:"20%",
                height:100,
                resizeMode:'contain',
            },
            containerLogo:{
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                paddingTop:250
            },
            input:{
                borderColor:"#3E6097",
                borderWidth:3,
                borderRadius:10,
                padding:10,
                resizeMode:'contain',
                width:"90%",
            },
            buttom:{
                backgroundColor:'#3E6097',
                width:"50%",
                alignItems:'center',
                borderRadius:10,
                padding:10
            },
            componentsEye:{
                width:"90%",
                alignItems:'flex-end',
            },
            components:{
                width:"90%",
                alignItems:'flex-end',
            },
            title:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:40,
                textAlign:'center'
            },
            texts:{
                color:"#374754",
                textAlign:'center',
                fontSize:18
            },
            forgotPassword:{
                color:"#3E6097",
                fontWeight:'bold',
                fontSize:16
            }
        }
    })
});