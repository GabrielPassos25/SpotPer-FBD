import React, {useState} from 'react';
import {View,Text, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import {getFaixas} from '../../../service/api.js'
import NavBar from '../../components/NavBar/NavBarHome'
import ImageGiant from '../../components/ImageGiant'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/Home/style'
import music from '../../data/TableHome/Musics/music.js';


export default function Home(){
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [musics, setMusics] = useState({sent:false,musics:[]});
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

  /*{Web app}*/
  if(Platform.OS === 'web'){
    return(
      <View style={styleWeb.navbar}>
        <View>
          <NavBar/>
        </View>
        <View style = {styleWeb.container}>
          <View style = {styleWeb.imagegiant}>
            <ImageGiant/>
          </View>
          <View style = {styleWeb.home}>
            <View style={styleWeb.containertext}>
              <Text style = {styleWeb.title}>Suas Músicas Mais Tocadas</Text>
              <View style={{paddingTop:20}}></View>
              <Text style = {styleWeb.description}>Selecionamos as músicas que você mais escutou nos últimos dias. Escute, agora mesmo, suas músicas do momento!</Text>
              <View style={{paddingTop:20}}></View>
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
                data={musics.musics}
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