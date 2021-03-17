import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 

export default function Register(){
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
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
        try{
            auth.createUserWithEmailAndPassword(email,password)
                .then(() => {navigation.navigate("Home"); alert("Usuário criado com sucesso!")})
                .catch(error => {
                    switch(error.code){
                        case 'auth/email-already-in-use':
                            alert('Email já está cadastrado!','O email informado já está cadastrado em nosso sistema!')
                            break;
                        case 'auth/invalid-email':
                            alert('Email inexistente!','Por favor, verifique o email digitado e tente novamente!');
                    }
                })
        }catch(err){
            alert("Error : ", err);
        }
    }

    return(
        <View style= {styles.container}>
            <View style = {styles.container1}>
                <View style = {styles.containerImage}>
                    <Image source = {require('../../../assets/imageRegister.png')} style={styles.image}/>
                </View>
            </View>
            <View style = {styles.container2}>
                <View style = {styles.containerLogo}>
                    <Image source = {require('../../../assets/logo.png')} style={styles.logo}/>
                    <Text style ={styles.title}>Registro</Text>
                    <View style={{paddingTop:10}}/>
                    <Text style ={styles.texts}>Seja bem-vindo ao SpotPer!</Text>
                    <View style={{paddingTop:10}}/>
                    <Text style ={styles.texts}>Insira suas credenciais abaixo para realizar o cadastro na plataforma.</Text>
                    <View style={{paddingTop:10}}/>
                    <View style = {styles.email}>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styles.input}
                            placeholder="Email"
                        />
                    </View>
                    <View style={{paddingTop:10}}/>
                    <View style ={styles.components}>
                    <TouchableOpacity onPress={() => setVisivel(!visivel)}>
                        <Entypo name="eye" size={24} color="black"/>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:10}}/>
                    <View style = {styles.passwordField}>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styles.input}
                            placeholder="Senha"
                            secureTextEntry = {visivel}
                        />
                        <View style={{paddingLeft:40}}/>
                        <TextInput
                            onChangeText={setConfirmPassword}
                            value={ConfirmPassword}
                            color='black'
                            backgroundColor= '#FFFFFF'
                            style = {styles.input}
                            placeholder="Confirmar Senha"
                            secureTextEntry = {visivel}
                        />
                    </View>
                    <View style={{paddingTop:10}}/>
                    <View style ={styles.components}>
                      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                          <Text style ={{color:"#3E6097", fontWeight:'bold', fontSize:16}}>Já possui cadastro?</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:10}}/>
                    <TouchableOpacity style = {styles.buttom} onPress={()=>createUser()}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Registrar</Text>
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
        width:"100%",
    },
    buttom:{
        backgroundColor:'#3E6097',
        width:"50%",
        alignItems:'center',
        borderRadius:10,
        padding:10
    },
    components:{
        width:"90%",
        alignItems:'flex-end'
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
    },
    email:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:"90%"
    },
    passwordField:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:"90%"
    }
});