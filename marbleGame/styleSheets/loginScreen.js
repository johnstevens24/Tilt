import { StyleSheet } from "react-native";

export default StyleSheet.create({
    LoginBox: {flexDirection:'column', 
    width:'60%', 
    height:'60%', 
    justifyContent:'flex-start', 
    alignItems:'center', 
    padding:'4%',
    borderWidth:'1px'},

    TextInput: {
        width:'100%',
        fontSize:24, 
        backgroundColor:'white', 
        borderWidth:'1px', 
        borderRadius:5, 
        marginBottom:'10%',
        backgroundColor:'#e9e9e9',
    },
    
    Title:{
        fontSize:40,
        fontStyle:'italic',
        marginBottom:'15%',
    },

    LoginButton: {
        backgroundColor:'#f7162e',
        width:'100%',
        height:'20%',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },

    LoginButtonText:{
        fontSize:24,
        color:'white'
    },

    CreateAccount: {
        marginVertical:'5%',
        width:'80%',
        height:'10%',
        backgroundColor:'#d9d9d9',
        borderRadius:5,
        borderWidht:1,
        alignItems:'center',
        justifyContent:'center',
    }
});
