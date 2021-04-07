import React, {useState} from 'react';
import {View,Text, Platform,TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Audio} from 'expo-av'
import NavBar from '../../components/NavBar/NavBarPlayer'
import styleWeb from '../../styles/web/MusicPlayer/style'

export default function MusicPlayer(){
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = React.useState(true);
  async function playSound(){
    if(playing){
      console.log('Playing Sound');
      const { sound } =  await Audio.Sound.createAsync({uri: 'http://docs.google.com/uc?export=open&id=1XbqsgaIPU5cYH_4zbq97w4PnrYUuJsCl'}, {shouldPlay:true});
      console.log('Loading Sound')
      setSound(sound);
      setPlaying(false);
    }
    else{
      console.log('Pausing Sound');
      await sound.pauseAsync();
      setPlaying(true);
    }
  }
  
  /*{Web app}*/
  if(Platform.OS === 'web'){
    return(
      <View style={styleWeb.navbar}>
        <View>
          <NavBar/>
        </View>
        <View style = {{flex:1}}>
          <ImageBackground source={require('../../../assets/player.png')} style={styleWeb.image}>
            <View style ={styleWeb.tocador}>
              <Text style={styleWeb.title}>Música em Execução</Text>
              <View style = {{paddingTop:60}}/>
              <Image source = {require('../../../assets/noTimeToDie.png')} style={styleWeb.imageplayer}/>
              <View style = {{paddingTop:60}}/>
              <Text style={styleWeb.musicname}>No Time to Die</Text>
              <View style = {{paddingTop:60}}/>
              <Text style= {{textAlign:'center', padding:20}}>"No Time to Die" is a song by American singer and songwriter Billie Eilish. It is the theme song for the upcoming James Bond film of the same name, and was released through Darkroom and Interscope Records on February 13, 2020. The song was written by Eilish and her brother Finneas O'Connell, and recorded in a bedroom studio. At age 18, Eilish is the youngest artist to have written and recorded a James Bond theme song. The song won the Grammy Award for Best Song Written for Visual Media at the 63rd Annual Grammy Awards.</Text>
              <View style = {{paddingTop:60}}/>
              <View style={styleWeb.buttons}>
                <TouchableOpacity>
                  <Image source = {require('../../../assets/back.png')} style={styleWeb.playerbuttonsmini}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={playSound}>
                  {playing ? (
                    <Image source = {require('../../../assets/playButton.png')} style={styleWeb.playerbuttons}/>
                    ) : (
                      <Image source = {require('../../../assets/pauseButton.png')} style={styleWeb.playerbuttons}/>
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source = {require('../../../assets/next.png')} style={styleWeb.playerbuttonsmini}/>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
  /*{Mobile app}*/
  else if(Platform.OS === 'android' || Platform.OS === 'ios'){
  }
}