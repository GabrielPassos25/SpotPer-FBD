import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/PlaylistDescription/style'
import { filter_faixas } from '../../../service/utils.js'
import { getFaixas, removePlaylist, remove_faixa_from_playlist } from '../../../service/api.js'


export default function PlaylistDescription(){
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sentMusics, setSentMusics] = useState(false)
  const [receivedMusics, setReceivedMusics] = useState(false)
  const [faixas, setFaixas] = useState([])
  const [faixasFiltradas, setFaixasFiltradas] = useState([])
  const [selectedFaixas, setSelectedFaixas] = useState([])

  const pl = JSON.parse(localStorage.getItem("current_playlist"))

  const deletePlaylist = () => {
    removePlaylist(pl.id, res => {
      if (res.message == 'Ok') {
        alert("Playlist deletada com sucesso!")
        navigation.navigate('Playlists')
      } else alert(res.message)
    })
  }

  const getMusics = () => {
    if (!receivedMusics) return []

    let Faixas = []
    Object.keys(pl.id_faixas).map(ca => {
      pl.id_faixas[ca].map(pos => {
        let faixa = faixasFiltradas.find(x=> x['cod_album'] == ca && x['posicao'] == pos)
        if(faixa) Faixas = Faixas.concat(faixa)
      })
    })
    return Faixas
  }

  const removeFaixas = () => {
    for(let i in selectedFaixas){
      remove_faixa_from_playlist(selectedFaixas[i], pl, res => {
        if(res.message != 'Ok') alert(res.message)
        if(i == selectedFaixas.length -1){
          alert("Músicas removidas com sucesso!")
          navigation.navigate('PlaylistDescription')
        }
      })
    }
  }
  
  React.useEffect(() => {
    if (!sentMusics) {
      getFaixas((res) => {
        setSentMusics(true)
        setReceivedMusics(true)
        setFaixas(res.body.faixas)
        setFaixasFiltradas(res.body.faixas)
      });
      setSentMusics(true)
    }
  })
  
  const onChangeSearch = query => {
    setFaixasFiltradas(filter_faixas(faixas, query))
    setSearchQuery(query);
  }

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
                <Text style = {styleWeb.title}>Playlist - {pl.nome}</Text>
                <View style={{paddingTop:10}}></View>
                <Text style = {styleWeb.description}>Nessa página você pode excluir suas músicas, selecionando a música e clicando em excluir música!</Text>
                <Text style = {styleWeb.description}>Para adicionar músicas basta clicar no botão "Adicionar Músicas"!</Text>
                <View style={{paddingTop:20}}></View>
              </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <TouchableOpacity onPress={()=> {
                deletePlaylist()
              }}>
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

              <TouchableOpacity onPress={removeFaixas}>
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
                data={getMusics(pl.id)}
                theme="SpotPer"
                customStyles={customStyles}
                noHeader
                pagination
                selectableRows
                highlightOnHover
                pointerOnHover
                onRowClicked = {row => {
                  localStorage.setItem('current_music', JSON.stringify(row))
                  navigation.navigate('MusicPlayerTest')
                }}
                onSelectedRowsChange = {value => setSelectedFaixas(value.selectedRows)}
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