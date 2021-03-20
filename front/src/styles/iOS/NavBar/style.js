import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    container:{
        paddingTop:40,
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
        justifyContent:'center'
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
    scrollview:{
        width:"100%", 
        height:"100%"
    },
    logo:{
        width:60,
        height:60
    },
    profile1:{
        width:40,
        height:40
    }
});

export default style