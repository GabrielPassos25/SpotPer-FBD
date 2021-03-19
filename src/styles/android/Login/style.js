import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    container1:{
        flex:1,
        backgroundColor:"#D8CECE",
    },
    container2:{
        flex:1,
        backgroundColor:"#F3F3F3"
        
    },
    containerImage:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        flex:1,
        width: "60%",
    },
    logo:{
        width:"20%",
        height:100,
    },
    containerLogo:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        paddingTop:40
    },
    input:{
        borderColor:"#3E6097",
        borderWidth:3,
        borderRadius:10,
        padding:10,
        width:"90%",
    },
    buttom:{
        backgroundColor:'#3E6097',
        width:"50%",
        alignItems:'center',
        borderRadius:10,
        padding:10
    },
    componentsEye:{
        width:"90%",
        alignItems:'flex-end',
    },
    components:{
        width:"90%",
        alignItems:'flex-end',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        color:"#3E6097",
        fontWeight:'bold',
        fontSize:40
    },
    texts:{
        color:"#374754",
        textAlign:'center',
        fontSize:18
    },
    forgotPassword:{
        color:"#3E6097",
        fontWeight:'bold',
        fontSize:16
    }
});

export default style