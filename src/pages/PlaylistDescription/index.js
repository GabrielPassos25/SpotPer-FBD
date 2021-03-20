import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/PlaylistDescription/style'


export default function PlaylistDescription(){
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  /*{Web app}*/
  if(Platform.OS === 'web'){
    return(
      <View style={styleWeb.navbar}>
        <View>
          <NavBar/>
        </View>
        <View style = {styleWeb.container}>
          <View style = {styleWeb.imagegiant}>
            <View style= {styleWeb.containerimage}>
              <Image source = {require('../../../assets/imageGiantAllMusics.png')} style ={styleWeb.image}/>
            </View>
          </View>
          <View style = {styleWeb.home}>
            <View>
              <View>
                <Text style = {styleWeb.title}>Playlist de Rock</Text>
                <View style={{paddingTop:20}}></View>
                <Text style = {styleWeb.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
              </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <TouchableOpacity onPress={()=> {navigation.navigate('Playlists');alert('Playlist Apagada')}}>
                <View style={styleWeb.cardremove}>
                  <Text style={styleWeb.removeplaylist}>Excluir Playlist</Text>
                </View>
              </TouchableOpacity>
              </View>
              <View>
              <View style={styleWeb.cardscontainer}>
              <TouchableOpacity onPress={()=>navigation.navigate('AddMusicsDescription')}>
                <View style={styleWeb.cards}>
                  <Text style={styleWeb.addmusic}>Adicionar Música</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>alert('Música(s) Excluídas(s)!')}>
                <View style={styleWeb.cards}>
                  <Text style={styleWeb.removemusic}>Excluir Música</Text>
                </View>
              </TouchableOpacity>
              </View>
              </View>
            </View>
              <View style={styleWeb.containersearch}>
                <View style={styleWeb.searchbar}>
                  <Searchbar
                    placeholder="Procure músicas"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style ={{borderRadius:10}}
                  /> 
                </View>
              </View>
            </View>
            <View style = {styleWeb.table}>           
              <DataTable
                columns={columns}
                data={movies}
                pagination
                selectableRows
                noHeader={true}
                theme="SpotPer"
                selectableRowsHighlight={true}
                customStyles={customStyles}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  /*{Mobile app}*/
  else if(Platform.OS === 'android' || Platform.OS === 'ios'){
  }
}

/*{Data style}*/
createTheme('SpotPer', {
  text: {
    primary: '#374754',
    secondary: '#374754',
  },
  background: {
    default: '#E3E1E1',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  }
});

const customStyles = {
  rows: {
    style: {
      minHeight: '55px'
    }
  },
  headCells: {
    style: {
      paddingLeft:'30px'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px'
    },
  },
};