import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:"#D8CECE",
        alignItems:'center'
    },
    components:{
        flexDirection:'row',
        alignItems:'center',
        width:"33%"
    },
    options:{
        flexDirection:'column',
        alignItems:'center',
        width:"25%",
        justifyContent:'center',
    },
    textlogo:{
        color:'#3E6097',
        fontWeight:'bold',
        fontSize:30
    },
    textActive:{
        color:"#3E6097",
        fontWeight:'bold',
        textAlign:'center'
    },
    textDeactive:{
        color:"#374754",
        fontWeight:'bold',
        textAlign:'center'
    },
    profile:{
        paddingRight:10,
        width:"33%",
        alignItems:'flex-end'
    },
    imagelogo:{
        width:60,
        height:60
    },
    icons:{
        width:24,
        height:24,
    },
    profileicon:{
        width:40,
        height:40
    } 
});

export default style