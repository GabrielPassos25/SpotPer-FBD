import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import { auth } from '../../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import NavBar from '../../components/NavBar'

export default function Home(){
    return(
        <View style={{flex:1}}>
            <NavBar/>
            <View>
                
            </View>
        </View>
    );
}