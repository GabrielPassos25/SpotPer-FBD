import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    navbar:{
        flex:1
    },
    container:{
        flex:1 ,
        backgroundColor:"#F3F3F3",
        flexDirection:'row', 
        paddingRight:50
    },
    imagegiant:{
        flex:1
    },
    home:{
        flex:4, 
        flexDirection:'column', 
        paddingTop:'0.5%', 
        paddingLeft:50
    },
    containertext:{
        alignItems:'center'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#3E6097',
        textAlign:'center',
        paddingTop:20
    },
    description:{
        fontSize:18,
        color:'#374754',
        textAlign:'center'
    },
    containersearch:{
        backgroundColor:'#E3E1E1',
        width:'100%',
    },
    searchbar:{
        padding:10,
        alignItems:'flex-end',
        paddingRight:25,
    },
    table:{
        flex:5,
    },
    containerimage:{
        height:'100%',
        alignItems:'flex-start',
    },
    image:{
        flex:1,
        width: "95%"
    },
    cardscontainer:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        flexDirection:'row'
    },
    cards:{
        backgroundColor:'#C7C7C7',
        padding:10,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        paddingLeft:10,
        maxWidth:120,
        minWidth:100,
        borderColor:'#E3E1E1',
        borderWidth:1
    },
    addmusic:{
        fontSize:18,
        color:'#374754',
        textAlign:'center'
    },
    removemusic:{
        fontSize:18,
        color:'#760000',
        textAlign:'center'
    },
    cardcreate:{
        backgroundColor:'#3E6097',
        padding:10,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        paddingLeft:10,
        maxWidth:125,
        minWidth:100,
        borderColor:'#E3E1E1',
        borderWidth:1
    },
    createplaylist:{
        fontSize:18,
        color:'white',
        textAlign:'center'
    },
    inputtitle:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        textAlign:'center',
        width:'30%',
        backgroundColor:'#E3E1E1',
        borderRadius:10
    },
    inputdescription:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        textAlign:'center',
        width:'80%',
        backgroundColor:'#E3E1E1',
        borderRadius:10
    }
});

export default style