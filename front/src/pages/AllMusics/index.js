import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import DataTable, {createTheme} from "react-data-table-component";
import { useNavigation } from '@react-navigation/core';
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarFaixas'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/AllMusics/style'


export default function AllMusics(){
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
                <Text style = {styleWeb.title}>Suas Faixas - Visão Geral</Text>
                <View style={{paddingTop:20}}></View>
                <Text style = {styleWeb.description}>Aqui está a seleção de todas as suas músicas!</Text>
                <Text style = {styleWeb.description}>Dica: Crie uma playlist para organizar a visualização das suas músicas.</Text>
              </View>
            <View style={styleWeb.cardscontainer}>
            <View style={{paddingLeft:10}}/>
            <TouchableOpacity onPress={()=> alert('Música(s) Excluídas(s)!')}>
              <View style={styleWeb.cards}>
                <Text style={styleWeb.removemusic}>Excluir Música</Text>
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
                  data={movies}
                  theme="SpotPer"
                  customStyles={customStyles}
                  noHeader
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                  pointerOnHover
                  selectableRows
                  onRowClicked = {() => {navigation.navigate('MusicPlayerTest')}}
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