import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/CreatePlaylist/style'

export default function CreatePlaylist(){
  const navigation = useNavigation();
  const [name, onChangeName] = React.useState("");
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
              <View style ={{alignItems:'center'}}>
                <TextInput
                    style={styleWeb.inputtitle}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Nome da Playlist"
                    keyboardType="numeric"
                />
                <TextInput
                    multiline
                    style={styleWeb.inputdescription}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Descrição"
                    keyboardType="numeric"
                />
              </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <TouchableOpacity onPress={()=>{navigation.navigate('Playlists');alert('Playlist Criada!')}}>
                <View style={styleWeb.cardcreate}>
                  <Text style={styleWeb.createplaylist}>Adicionar Playlist</Text>
                </View>
              </TouchableOpacity>
              </View>
              <View>
              <View style={styleWeb.cardscontainer}>
              <TouchableOpacity onPress={()=>navigation.navigate('AddMusicsPlaylist')}>
                <View style={styleWeb.cards}>
                  <Text style={styleWeb.addmusic}>Adicionar Música(s)</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>alert('Música(s) Excluída(s)!')}>
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
                pagination
                selectableRows
                noHeader={true}
                theme="SpotPer"
                noDataComponent="Sem músicas adicionadas"
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