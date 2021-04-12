import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import DataTable, {createTheme} from "react-data-table-component";
import { useNavigation } from '@react-navigation/core';
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarFaixas'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/AllMusics/style'
import { filter_faixas } from '../../../service/utils.js'
import { getFaixas, add_faixa_into_playlist } from '../../../service/api.js'


export default function AddMusicsDescription(){
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sentMusics, setSentMusics] = useState(false)
  const [receivedMusics, setReceivedMusics] = useState(false)
  const [faixas, setFaixas] = useState([])
  const [faixasFiltradas, setFaixasFiltradas] = useState([])
  const [selectedFaixas, setSelectedFaixas] = useState([])

  const pl = JSON.parse(localStorage.getItem("current_playlist"))

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

  const addFaixas = () => {
    for(let i in selectedFaixas){
      add_faixa_into_playlist(selectedFaixas[i], pl, res => {
        if(res.message != 'Ok') alert(res.message)
        if(i == selectedFaixas.length -1){
          alert("Músicas adicionadas com sucesso!")
          navigation.navigate('Home')
        }
      })
    }
  }
  
  React.useEffect(() => {
    if (!sentMusics) {
      getFaixas((res) => {
        let Faixas = []

        for(let i in res.body.faixas){
          let faixa = res.body.faixas[i]
          let ca = faixa['cod_album']
          let pos = faixa['posicao']
          if(pl.id_faixas[ca]){
            if(pl.id_faixas[ca].find(x=> x==pos)){
              continue
            }
          }
          Faixas = Faixas.concat(faixa)
        }

        setSentMusics(true)
        setReceivedMusics(true)
        setFaixas(Faixas)
        setFaixasFiltradas(Faixas)
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
                <Text style = {styleWeb.title}>Adicionar Músicas</Text>
                <View style={{paddingTop:20}}></View>
                <Text style = {styleWeb.description}>Adicione suas músicas para sua playlist!</Text>
              </View>
            <View style={styleWeb.cardscontainer}>
            <TouchableOpacity onPress={addFaixas}>
              <View style={styleWeb.cards}>
                <Text style={styleWeb.addmusic}>Adicionar Música(s)</Text>
              </View>
            </TouchableOpacity>
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
                pagination
                selectableRows
                noHeader={true}
                theme="SpotPer"
                selectableRowsHighlight={true}
                customStyles={customStyles}
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