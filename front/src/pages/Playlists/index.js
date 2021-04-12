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
import { filter_faixas } from '../../../service/utils.js'

export default function Playlists() {
  const navigation = useNavigation();
  const [sentMusics, setSentMusics] = useState(false)
  const [receivedMusics, setReceivedMusics] = useState(false)
  const [faixas, setFaixas] = useState([])
  const [playlists, setPlaylists] = useState({
    sent: false,
    playlists: [],
    received: false,
  })

  function refreshPage(){ 
    window.location.reload(); 
  }

  const deletePlaylist = (id) => {
    removePlaylist(id, res => {
      if (res.message == 'Ok') {
        alert("Playlist deletada com sucesso!")
        requestPlaylists()
        navigation.navigate('Playlists')
        refreshPage
      } else alert(res.message)
    })
  }

  const requestPlaylists = () => {
    getPlaylists(res => {
      if (res.message == "Ok") {
        let pls = { ...playlists }
        pls.sent = true
        pls.playlists = res.body.Playlists
        if(!localStorage.getItem('playlists_last_id')) localStorage.setItem('playlists_last_id', pls.playlists.length)
        pls.received = true
        setPlaylists(pls)
      } else {
        alert(res.message)
      }
    })
  }


  React.useEffect(() => {
    if (!playlists.sent) {
      let pls = { ...playlists }
      pls.sent = true
      requestPlaylists()
      setPlaylists(pls)
    }
  })

  React.useEffect(() => {
    if (!sentMusics) {
      getFaixas((res) => {
        setSentMusics(true)
        setReceivedMusics(true)
        setFaixas(res.body.faixas)
      });
      setSentMusics(true)
    }
  })

  const PlaylistDetails = ({ pl, Faixas }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [faixasFiltradas, setFaixasFiltradas] = useState(Faixas)
    
    const onChangeSearch = query => {
      setFaixasFiltradas(filter_faixas(faixas, query))
      setSearchQuery(query);
    }

    const getMusics = idPl => {
      if (!playlists.received || !receivedMusics) return []
  
      let pl = null
      for (let i in playlists.playlists) {
        pl = playlists.playlists[i]
        if (pl['id'] == idPl) break;
      }
  
      let Faixas = []
        Object.keys(pl.id_faixas).map(ca => {
          pl.id_faixas[ca].map(pos => {
            let faixa = faixasFiltradas.find(x=> x['cod_album'] == ca && x['posicao'] == pos)
            if(faixa) Faixas = Faixas.concat(faixa)
          })
        })  
      return Faixas
    }

    return (
      <View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                localStorage.setItem("current_playlist", JSON.stringify(pl))
                navigation.navigate('PlaylistDescription')}
              }>
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
                <TouchableOpacity onPress={() => { deletePlaylist(pl.id); }}>
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
              <View style={{ paddingTop: 20, backgroundColor: '#E3E1E1' }} />
                <Searchbar
                  placeholder="Procure músicas"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  style={{ borderRadius: 10 }}
                />
              </View>
            </View>
            <View style={styleWeb.playlistdescription}>
            </View>
            <View style={{ paddingTop: 10, backgroundColor: '#E3E1E1' }} />
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
                  onRowClicked = {row => {
                    localStorage.setItem('current_music', JSON.stringify(row))
                    navigation.navigate('MusicPlayerTest')
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 40 }} />
      </View>
    )
  }



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
                  </View>
                </View>
              </View>
              {!playlists.received ? <></> : playlists.playlists.map((pl, index) => <PlaylistDetails key={index} pl={pl} Faixas={faixas} />)}
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
                          onRowClicked = {row => {
                            localStorage.setItem('current_music', JSON.stringify(row))
                            navigation.navigate('MusicPlayerTest')
                          }}
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
                          onRowClicked = {row => {
                            localStorage.setItem('current_music', JSON.stringify(row))
                            navigation.navigate('MusicPlayerTest')
                          }}
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