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

  const faixa = JSON.parse(localStorage.getItem('current_music'))
  console.log(faixa)

  async function playSound(){
    if(playing){
      console.log('Playing Sound');
      const { sound } =  await Audio.Sound.createAsync({uri: faixa.link}, {shouldPlay:true});
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
          <ImageBackground source={require('../../../assets/player2.png')} style={styleWeb.image}>
            <View style ={styleWeb.tocador}>
              <Text style={styleWeb.title}>Música em Execução</Text>
              <View style = {{paddingTop:60}}/>
              <Image source = {require('../../../assets/player.png')} style={styleWeb.imageplayer}/>
              <View style = {{paddingTop:60}}/>
              <Text style={styleWeb.musicname}>{faixa.nome}</Text>
              <Text style= {{textAlign:'center', padding:20, fontSize:18}}>{faixa.descricao}</Text>
              <View style = {{paddingTop:40}}/>
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