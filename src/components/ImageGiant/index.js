import React from 'react';
import {View, Image, Platform} from 'react-native';
import styleWeb from '../../styles/web/ImageGiant/style'
export default function NavBar(){

    /*{Web app}*/
    if(Platform.OS === 'web'){
        return(
            <View style= {styleWeb.container}>
               <Image source = {require('../../../assets/imageGiant2.png')} style ={styleWeb.image}/>
            </View>
        );
    }

    /*{Mobile app}*/
    else if(Platform.OS === 'android' || Platform.OS === 'ios'){
    }
}