import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visivel, setVisivel] = useState(true);
    
    const login = () => {
      console.log(email);
      console.log(password);
        auth.signInWithEmailAndPassword(email,password).then(function(val){
          setEmail("");
          setPassword("");
          navigation.navigate('Home');
        }).catch(function(error){
          console.log(error);
          alert("Credenciais inválidas");
        })
    }

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
                    <Text style ={styles.title}>Login</Text>
                    <View style={{paddingTop:10}}/>
                    <Text style ={styles.texts}>Seja bem-vindo ao SpotPer!</Text>
                    <View style={{paddingTop:10}}/>
                    <Text style ={styles.texts}>Insira suas credenciais abaixo para realizar o login na plataforma.</Text>
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
                    <View style ={styles.componentsEye}>
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
                        style = {styles.input}
                        placeholder="Senha"
                        secureTextEntry = {visivel}
                      />
                    <View style={{paddingTop:10}}/>
                    <View style ={styles.components}>
                      <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                          <Text style ={styles.forgotPassword}>Esqueceu a Senha?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                          <Text style ={styles.forgotPassword}>Ainda não possui cadastro?</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:10}}/>
                    <TouchableOpacity style = {styles.buttom} onPress={()=>login()}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        color:"#3E6097",
        fontWeight:'bold',
        fontSize:40
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
});