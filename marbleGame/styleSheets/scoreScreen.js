import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


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

    LeaderBoardSubText: {
        fontSize:16,
        fontWeight:'400',
        color:"black",
    },

    LeaderBoardRow: {
        flexDirection:'row', 
        width:'50%', 
        alignItems:'flex-start', 
        justifyContent:'flex-start'
    },

    backButton: {
        position:'absolute',
        top: 30,
        left: width-80,
        right: 10,
        bottom: height-80,
        backgroundColor: '#c9c9c9',
        zIndex:1,
        borderRadius:10,
        borderColor:'black',
        borderBottomWidth:3,
        borderRightWidth:3,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },

    backButtonText: {
        fontSize:20,
        fontWeight:'500',
        color:"black",
    },

    TimeFinishedText: {
        fontSize: 20,
        fontWeight:'500'
    }

});
