import React, {useState} from 'react';
import {View,Text, Platform, Image,TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DataTable, {createTheme} from "react-data-table-component";
import {Searchbar} from 'react-native-paper'
import {getFaixas} from '../../../service/api.js'
import NavBar from '../../components/NavBar/NavBarArtists'
import movies from '../../data/TableHome/Musics/music'
import columns from '../../data/TableHome/Header/header'
import styleWeb from '../../styles/web/Artists/style'

export default function Artists(){
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const navigation = useNavigation();
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
        <View>
          <View style = {styleWeb.container}>
            <View style = {styleWeb.home}>
              <View style={{flexDirection:'row'}}>
                <View style= {{flex:8}}>
                  <Text style = {styleWeb.title}>Seus Artistas</Text>
                  <View style={{paddingTop:20}}/>
                  <Text style = {styleWeb.description}>Aqui está a seleção de todos os seus artistas!</Text>
                  <View style={{alignItems:'center'}}>
                    <View style={{paddingTop:20}}/>
                  </View>
                </View>
              </View>
              <View style={{flex:1}}>
              <View style={{paddingTop:20}}/>
                  <View style = {{flexDirection:'column'}}>
                    <View style={styleWeb.containersearch}>
                      <Text style={styleWeb.nameartist}>Billie Eilish</Text>
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
                      <Text style ={{fontSize:14}}>Billie Eilish Pirate Baird O'Connell, mais conhecida como Billie Eilish, é uma cantora e compositora estadunidense. Ela ganhou popularidade em 2016, quando lançou seu single de estreia "Ocean Eyes" no SoundCloud, posteriormente lançado pelas gravadoras Darkroom e Interscope Records.</Text>
                    </View>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styleWeb.imageartist}>
                      <Image source = {require('../../../assets/billie.png')} style={styleWeb.image}/>
                    </View>
                    <View style={{flex:5, backgroundColor:'#E3E1E1'}}>
                      <View style = {styleWeb.table}>           
                      <DataTable
                        columns={columns}
                        data={musics.musics.filter((item) => item.descricao == "Billie Eilish")}
                        theme="SpotPer"
                        customStyles={customStyles}
                        noHeader
                        pagination
                        selectableRowsHighlight
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
              <View style={{flexDirection:'row'}}>
              </View>
                <View style={{flex:1}}>
                  <View style = {{flexDirection:'column'}}>
                    <View style={styleWeb.containersearch}>
                      <Text style={styleWeb.nameartist}>The Weeknd</Text>
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
                      <Text style ={{fontSize:14}}>Abel Makkonen Tesfaye, mais conhecido por seu nome artístico the Weeknd, é um cantor, compositor, ator e produtor musical canadense. Ele ajudou a expandir a paleta musical do R&B, ao incorporar influências indie e de música eletrônica; seu trabalho é classificado como R&B alternativo.</Text>
                    </View>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styleWeb.imageartist}>
                      <Image source = {require('../../../assets/theweeknd.png')} style={styleWeb.image}/>
                    </View>
                    <View style={{flex:5, backgroundColor:'#E3E1E1'}}>
                      <View style = {styleWeb.table}>           
                      <DataTable
                        columns={columns}
                        data={musics.musics.filter((item) => item.descricao == "The Weeknd")}
                        theme="SpotPer"
                        customStyles={customStyles}
                        noHeader
                        pagination
                        selectableRowsHighlight
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
        <View style = {styleWeb.container}>
          <View style = {styleWeb.home}>
            <View style={{flexDirection:'row'}}>
            </View>
              <View style={{flex:1}}>
                <View style = {{flexDirection:'column'}}>
                  <View style={styleWeb.containersearch}>
                    <Text style={styleWeb.nameartist}>Oasis</Text>
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
                    <Text style ={{fontSize:14}}>Oasis foi uma banda inglesa de rock formada no ano de 1991, na cidade de Manchester. Até a sua extinção em 2009, era composta por Liam Gallagher, Noel Gallagher, Gem Archer, Andy Bell e Chris Sharrock.</Text>
                  </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={styleWeb.imageartist}>
                    <Image source = {require('../../../assets/oasis.jpg')} style={styleWeb.image}/>
                  </View>
                  <View style={{flex:5, backgroundColor:'#E3E1E1'}}>
                    <View style = {styleWeb.table}>           
                    <DataTable
                        columns={columns}
                        data={musics.musics.filter((item) => item.descricao == "Oasis")}
                        theme="SpotPer"
                        customStyles={customStyles}
                        noHeader
                        pagination
                        selectableRowsHighlight
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
          <View style={{paddingTop:20}}/>
        <View style = {styleWeb.container}>
          <View style = {styleWeb.home}>
            <View style={{flexDirection:'row'}}>
            </View>
              <View style={{flex:1}}>
                <View style = {{flexDirection:'column'}}>
                  <View style={styleWeb.containersearch}>
                    <Text style={styleWeb.nameartist}>Seus Outros Artistas</Text>
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
                    <Text style ={{fontSize:14}}>Aqui está a relação de todas as suas músicas pertencentes a outros artistas!</Text>
                  </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={styleWeb.imageartist}>
                    <Image source = {require('../../../assets/imageGiant2.png')} style={styleWeb.image}/>
                  </View>
                  <View style={{flex:5, backgroundColor:'#E3E1E1'}}>
                    <View style = {styleWeb.table}>           
                    <DataTable
                        columns={columns}
                        data={musics.musics.filter((item) => item.descricao != "Oasis" && item.descricao != "Billie Eilish" && item.descricao != "The Weeknd")}
                        theme="SpotPer"
                        customStyles={customStyles}
                        noHeader
                        pagination
                        selectableRowsHighlight
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