import React, { useState } from 'react';
import { View, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, { createTheme } from "react-data-table-component";
import { Searchbar } from 'react-native-paper'
import { getFaixas, getPlaylists, removePlaylist } from '../../../service/api.js'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/Playlists/style'

export default function Playlists() {
  const navigation = useNavigation();
  const onChangeSearch = query => setSearchQuery(query);
  const [searchQuery, setSearchQuery] = useState('');
  const [musics, setMusics] = useState({
    sent: false,
    musics: [],
    received: false,
  });
  const [playlists, setPlaylists] = useState({
    sent: false,
    playlists: [],
    received: false,
  })

  const getMusics = idPl => {
    if(!playlists.received || !musics.received) return []
    
    let i=0
    let pl = null
    while(i<playlists.playlists.length){
      pl = playlists.playlists[i]
      if(pl['id'] == idPl) break; 
      i++
    }
    let faixas = [] 
    Object.keys(pl.id_faixas).map(ca=>{
      pl.id_faixas[ca].map(pos=>{
        i = 0
        let faixa = null  
        while(i<musics.musics.length){
          faixa = musics.musics[i]
          if(faixa['cod_album'] == ca && faixa['posicao'] == pos) break; 
          i++
        }
        faixas = faixas.concat(faixa)
      })
    })
    return faixas
  }

  const deletePlaylist = (id) => {
    removePlaylist(id, res=>{
      if(res.message == 'Ok'){
        alert("Playlist deletada com sucesso!")
        requestPlaylists()
      }else alert(res.message)
    })
  }

  const requestPlaylists = () => {
    getPlaylists(res => {
      if (res.message == "Ok") {
        let pls = {...playlists}
        pls.sent = true
        pls.playlists = res.body.Playlists
        pls.received = true
        setPlaylists(pls)
      } else {
        alert(res.message)
      }
    })
  }


  React.useEffect(() => {
    if (!playlists.sent) {
      let pls = {...playlists}
      pls.sent = true
      requestPlaylists()
      setPlaylists(pls)
    }
  })

  React.useEffect(() => {
    if (!musics.sent) {
      let Musics = {... musics}
      Musics.sent = true
      getFaixas((res) => {
        if(res.message == 'Ok'){
          let Musics = {... musics}
          Musics.musics = res.body.faixas;
          Musics.received = true;
          setMusics(Musics)
        }else{
          alert(res.message)
        }
      });
      setMusics(Musics)
    }
  })
  React.useEffect(()=>{
    if(!musics.sent){
      getFaixas((res)=>{
        musics.musics = res.body.faixas;
        musics.sent = true;
        setMusics(musics)
      });
      setMusics({sent:true,musics:[]})
    }
  })

  if (Platform.OS === 'web') {
    return (
      <View style={styleWeb.navbar}>
        <View>
          <NavBar />
        </View>
        <View>
          <View style={styleWeb.container}>
            <View style={styleWeb.home}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                  <Text style={styleWeb.title}>Suas Playlists</Text>
                  <View style={{ paddingTop: 20 }} />
                  <Text style={styleWeb.description}>Aqui está a seleção de todas as suas playlists!</Text>
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ paddingTop: 20 }} />
                    <Searchbar
                      placeholder="Procure playlists"
                      onChangeText={onChangeSearch}
                      value={searchQuery}
                      style={{ borderRadius: 10, width: "20%" }}
                      place
                    />
                  </View>
                </View>
              </View>
              {!playlists.received ? <></> : playlists.playlists.map((pl, index) => (
                <View key={index}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('PlaylistDescription')}>
                          <View style={styleWeb.cardsAdd}>
                            <Text style={styleWeb.addmusic}>Conferir Playlist</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePlaylist')}>
                          <View style={styleWeb.cardsAdd} >
                            <Text style={styleWeb.addmusic}>Criar Nova Playlist</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <View style={styleWeb.cardscontainer}>
                          <TouchableOpacity onPress={() => { deletePlaylist(pl.id); navigation.navigate('Playlists')}}>
                            <View style={styleWeb.cards}>
                              <Text style={styleWeb.removemusic}>Excluir Playlist</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={styleWeb.containersearch}>
                        <Text style={styleWeb.title}>Playlist - {pl.nome}</Text>
                        <View style={styleWeb.searchbar}>
                          <Searchbar
                            placeholder="Procure músicas"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={{ borderRadius: 10 }}
                          />
                        </View>
                      </View>
                      <View style={styleWeb.playlistdescription}>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                      </View>
                      <View style={{ paddingTop: 20, backgroundColor:'#E3E1E1' }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={styleWeb.imagecontainer}>
                        <Image source={require('../../../assets/playlistsPhoto.png')} style={styleWeb.image} />
                      </View>
                      <View style={{ flex: 5 }}>
                        <View style={styleWeb.table}>
                          <DataTable
                            columns={columns}
                            data={getMusics(pl.id)}
                            theme="SpotPer"
                            customStyles={customStyles}
                            noHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            onRowClicked={() => { navigation.navigate('MusicPlayerTest') }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ paddingTop: 40 }} />
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* <View>
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
                          data={musics.musics}
                          theme="SpotPer"
                          customStyles={customStyles}
                          noHeader
                          pagination
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
                          data={musics.musics}
                          theme="SpotPer"
                          customStyles={customStyles}
                          noHeader
                          pagination
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
          </View> */}
        <View style={{ paddingBottom: 40 }} />
      </View>
    );
  }
  /*{Mobile app}*/
  else if (Platform.OS === 'android' || Platform.OS === 'ios') {
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
      paddingLeft: '30px'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px'
    },
  },
};