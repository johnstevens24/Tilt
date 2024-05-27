import { StyleSheet } from "react-native";

export default StyleSheet.create({
    
    Banner: {
        flexDirection:'row', 
        width:'100%', 
        height:'15%', 
        backgroundColor:'#f7162e', 
        justifyContent:'center', 
        alignItems:'center',
    },

    Title: {
        fontSize:35, 
        fontWeight:'700', 
        color:'white'
    },
    
    LeaderBoard: {
        flexDirection:'column', 
        width:'90%', 
        height:'50%', 
        backgroundColor:'#c9c9c9',
        borderWidth:'2px', 
        borderRadius:15, 
        margin:'5%', 
        padding:'4%'
    },

    LeaderBoardText: {
        fontSize:24,
        fontWeight:'600',
        color:"black",
    },


});
