import React, {useState} from 'react';
import {View,Text, Platform, Image, TouchableOpacity} from 'react-native';
import DataTable, {createTheme} from "react-data-table-component";
import { useNavigation } from '@react-navigation/core';
import {Searchbar} from 'react-native-paper'
import NavBar from '../../components/NavBar/NavBarFaixas'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/AllMusics/style'


export default function AddMusics(){
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
                <Text style = {styleWeb.title}>Adicionar Músicas</Text>
                <View style={{paddingTop:20}}></View>
                <Text style = {styleWeb.description}>Adicione suas músicas para sua playlist!</Text>
              </View>
            <View style={styleWeb.cardscontainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate('AllMusics'); alert('Música(s) Adicionada(s)!')}}>
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