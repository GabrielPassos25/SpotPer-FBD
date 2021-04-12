import {StyleSheet} from 'react-native'
const style = StyleSheet.create({
    navbar:{
        flex:1
    },
    image:{
        flex:1,
        resizeMode:'contain',
        justifyContent:'center',
        alignItems:'center'
    },
    tocador:{
        flex:0.9,
        width:'50%',
        backgroundColor:'#E3E1E1',
        borderRadius:20,
        alignItems:'center'
    },
    title:{
        fontSize:40,
        fontWeight:'bold',
        color:'#3E6097',
        paddingTop:40,
        flexDirection:'row',
        textAlign:'center'
    },
    imageplayer:{
        flex:1,
        width:'100%',
        height:200,
        alignItems:'center',
        resizeMode:'contain',
        paddingTop:20,
    },
    musicname:{
        fontSize:30,
        fontWeight:'bold',
        color:'#374754',
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        alignItems:'center'
    },
    playerbuttons:{
        width: 70,
        height:70
    },
    playerbuttonsmini:{
        width: 50,
        height:50
    }
});

export default style