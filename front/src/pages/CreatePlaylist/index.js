import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarPlaylists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/CreatePlaylist/style'
import { addPlaylist } from '../../../service/api.js'
import { getFaixas } from '../../../service/api.js'
import { filter_faixas } from '../../../service/utils.js'

export default function CreatePlaylist(){
  const navigation = useNavigation();
  const [name, onChangeName] = React.useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [sentMusics, setMusics] = useState(false)
  const [faixas, setFaixas] = useState([])
  const [faixasFiltradas, setFaixasFiltradas] = useState([])
  const [selectedFaixas, setSelectedFaixas] = useState([])

  React.useEffect(()=>{
    if(!sentMusics){
      getFaixas((res)=>{
        setMusics(true)
        setFaixas(res.body.faixas)
        setFaixasFiltradas(res.body.faixas)
      });
      setMusics(true)
    }
  })
  
  const onChangeSearch = query => {
    setFaixasFiltradas(filter_faixas(faixas, query))
    setSearchQuery(query);
  }


  const createPlaylist = ()=> {
    let id = 0
    if(localStorage.getItem('playlists_last_id')) id = Number(localStorage.getItem('playlists_last_id'))

    let playlist = {
      id: id + 1,
      nome: name,
      tempo_exec: 0,
      data_criacao: new Date(Date.now()).toISOString().substring(0, 10),
      id_faixas: {}
    }

    selectedFaixas.map(faixa=>{
      let ca = faixa.cod_album
      let pos = faixa.posicao

      if(!playlist.id_faixas[ca]) playlist.id_faixas[ca] = []
      playlist.id_faixas[ca] = playlist.id_faixas[ca].concat(pos)

      playlist.tempo_exec += faixa.duracao
    })

    addPlaylist(playlist, res=>{
      if(res.message == 'Ok'){
        alert("Playlist criada com sucesso!")
        navigation.navigate('Playlists')
        localStorage.setItem('playlists_last_id', id + 1)
      }else alert(res.message)
    })
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
              <View style ={{alignItems:'center'}}>
                <TextInput
                    style={styleWeb.inputtitle}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Nome da Playlist"
                    keyboardType="numeric"
                />
              </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              </View>
              <View>
              <View style={styleWeb.cardscontainer}>
              <TouchableOpacity onPress={createPlaylist}>
                <View style={styleWeb.cardcreate}>
                  <Text style={styleWeb.createplaylist}>Adicionar Playlist</Text>
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
                data={faixasFiltradas}
                theme="SpotPer"
                customStyles={customStyles}
                noHeader
                pagination
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                pointerOnHover
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