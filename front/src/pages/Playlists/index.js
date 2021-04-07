import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/Playlists/style'

export default function Playlists(){
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
        <View>
          <View style = {styleWeb.container}>
            <View style = {styleWeb.home}>
              <View style={{flexDirection:'row'}}>
                <View style= {{flex:8}}>
                  <Text style = {styleWeb.title}>Suas Playlists</Text>
                  <View style={{paddingTop:20}}/>
                  <Text style = {styleWeb.description}>Aqui está a seleção de todas as suas playlists!</Text>
                  <View style={{alignItems:'center'}}>
                  <View style={{paddingTop:20}}/>
                  <Searchbar
                    placeholder="Procure playlists"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style ={{borderRadius:10, width:"20%"}}
                    place
                  /> 
                  </View>
                </View>
              </View>
                <View style={{flex:1}}>
                  <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('PlaylistDescription')}>
                      <View style={styleWeb.cardsAdd}>
                        <Text style={styleWeb.addmusic}>Conferir Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('CreatePlaylist')}>
                      <View style={styleWeb.cardsAdd} >
                        <Text style={styleWeb.addmusic}>Criar Nova Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                  <View style={styleWeb.cardscontainer}>
                      <TouchableOpacity onPress={()=> {navigation.navigate('Playlists'); alert('Playlist apagada!')}}>
                        <View style={styleWeb.cards}>
                          <Text style={styleWeb.removemusic}>Excluir Playlist</Text>
                        </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                    <View style = {{flexDirection:'column'}}>
                      <View style={styleWeb.containersearch}>
                        <Text style={styleWeb.title}>Playlist de Rock</Text>
                        <View style={styleWeb.searchbar}>
                          <Searchbar
                            placeholder="Procure músicas"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style ={{borderRadius:10}}
                          /> 
                        </View>
                      </View>
                      <View style = {styleWeb.playlistdescription}>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={styleWeb.imagecontainer}>
                        <Image source = {require('../../../assets/playlistsPhoto.png')} style={styleWeb.image}/>
                      </View>
                      <View style={{flex:5}}>
                        <View style = {styleWeb.table}>           
                        <DataTable
                          columns={columns}
                          data={movies}
                          theme="SpotPer"
                          customStyles={customStyles}
                          noHeader
                          pagination
                          selectableRowsHighlight
                          highlightOnHover
                          pointerOnHover
                          onRowClicked = {() => {navigation.navigate('MusicPlayerTest')}}
                        />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            </View>
        </View>
        <View style={{paddingTop:20}}/>
        <View>
          <View style = {styleWeb.container}>
            <View style = {styleWeb.home}>
                <View style={{flex:1}}>
                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('PlaylistDescription')}>
                      <View style={styleWeb.cardsAdd}>
                        <Text style={styleWeb.addmusic}>Conferir Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('CreatePlaylist')}>
                      <View style={styleWeb.cardsAdd}>
                        <Text style={styleWeb.addmusic}>Criar Nova Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                  <View style={styleWeb.cardscontainer}>
                      <TouchableOpacity onPress={()=> {navigation.navigate('Playlists'); alert('Playlist apagada!')}}>
                        <View style={styleWeb.cards}>
                          <Text style={styleWeb.removemusic}>Excluir Playlist</Text>
                        </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                    <View style = {{flexDirection:'column'}}>
                      <View style={styleWeb.containersearch}>
                        <Text style={styleWeb.title}>Playlist de Pop</Text>
                        <View style={styleWeb.searchbar}>
                          <Searchbar
                            placeholder="Procure músicas"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style ={{borderRadius:10}}
                          /> 
                        </View>
                      </View>
                      <View style = {styleWeb.playlistdescription}>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={styleWeb.imagecontainer}>
                        <Image source = {require('../../../assets/playlistsPhoto.png')} style={styleWeb.image}/>
                      </View>
                      <View style={{flex:5}}>
                        <View style = {styleWeb.table}>           
                        <DataTable
                          columns={columns}
                          data={movies}
                          theme="SpotPer"
                          customStyles={customStyles}
                          noHeader
                          pagination
                          selectableRowsHighlight
                          highlightOnHover
                          pointerOnHover
                          onRowClicked = {() => {navigation.navigate('MusicPlayerTest')}}
                        />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            </View>
          </View>
          <View style={{paddingTop:20}}/>
          <View>
          <View style = {styleWeb.container}>
            <View style = {styleWeb.home}>
                <View style={{flex:1}}>
                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('PlaylistDescription')}>
                      <View style={styleWeb.cardsAdd}>
                        <Text style={styleWeb.addmusic}>Conferir Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('CreatePlaylist')}>
                      <View style={styleWeb.cardsAdd}>
                        <Text style={styleWeb.addmusic}>Criar Nova Playlist</Text>
                      </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                  <View style={styleWeb.cardscontainer}>
                      <TouchableOpacity onPress={()=> {navigation.navigate('Playlists'); alert('Playlist apagada!')}}> 
                        <View style={styleWeb.cards}>
                          <Text style={styleWeb.removemusic}>Excluir Playlist</Text>
                        </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                    <View style = {{flexDirection:'column'}}>
                      <View style={styleWeb.containersearch}>
                        <Text style={styleWeb.title}>Playlist de Funk</Text>
                        <View style={styleWeb.searchbar}>
                          <Searchbar
                            placeholder="Procure músicas"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style ={{borderRadius:10}}
                          /> 
                        </View>
                      </View>
                      <View style = {styleWeb.playlistdescription}>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={styleWeb.imagecontainer}>
                        <Image source = {require('../../../assets/playlistsPhoto.png')} style={styleWeb.image}/>
                      </View>
                      <View style={{flex:5}}>
                        <View style = {styleWeb.table}>           
                        <DataTable
                          columns={columns}
                          data={movies}
                          theme="SpotPer"
                          customStyles={customStyles}
                          noHeader
                          pagination
                          selectableRowsHighlight
                          highlightOnHover
                          pointerOnHover
                          onRowClicked = {() => {navigation.navigate('MusicPlayerTest')}}
                        />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            </View>
          </View>
          <View style={{paddingBottom:40}}/>
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