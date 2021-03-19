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
        paddingTop:'2%', 
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
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    searchbar:{
        padding:10,
        alignItems:'flex-end',
        paddingRight:25
    },
    table:{
        flex:5
    }
});

export default style