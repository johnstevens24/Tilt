import { StyleSheet } from "react-native";

export default StyleSheet.create({
    CreateUserBox: {
        flexDirection:'column', 
        width:'60%', 
        height:'70%', 
        justifyContent:'flex-start', 
        alignItems:'center', 
        padding:'4%',
        borderWidth:'1px'
    },

    TextInput: {
        width:'100%',
        fontSize:24, 
        borderWidth:'1px', 
        borderRadius:5, 
        marginBottom:'10%',
    },

    MissingTextInput: {
        width:'100%',
        fontSize:24, 
        borderWidth:'2px', 
        borderRadius:5, 
        marginBottom:'10%',
        borderColor:'red',
    },
    
    Title:{
        fontSize:40,
        fontStyle:'italic',
        marginBottom:'15%',
    },

    CreateUserButton: {
        backgroundColor:'#f7162e',
        width:'100%',
        height:'20%',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },

    CreateUserButtonText:{
        fontSize:24,
        color:'white'
    },

    Cancel: {
        marginVertical:'5%',
        width:'50%',
        height:'10%',
        backgroundColor:'#d9d9d9',
        borderRadius:5,
        borderWidht:1,
        alignItems:'center',
        justifyContent:'center',
    }
});
