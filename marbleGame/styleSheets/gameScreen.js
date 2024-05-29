import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    Banner: {
        flexDirection: 'row', width:'100%', height:'10%', alignItems:'center', justifyContent:'space-between', borderBottomWidth:'2px', padding:'1%'
    },

    BannerButton: {

    },

    StopWatch: {
        flexDirection: 'row', 
        width:'40%', 
        height:'80%', 
        borderWidth:'1px', 
        borderRadius:5, 
        justifyContent:'center', 
        alignItems:'center',
    },

    GameOverBox: {
        position:'absolute', 
        zIndex:10, 
        height: Dimensions.get('window').height*.2, 
        left: Dimensions.get('window').width*.2, 
        top: Dimensions.get('window').height*.4, 
        width: Dimensions.get('window').width*.6, 
        backgroundColor:"#f7162e",
        borderRadius:5,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
    },

    GameOverMessage: {
        height:'50%',
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }, 

    // GameOverBox: {
    //     position:'absolute', 
    //     zIndex:10, 
    //     height: Dimensions.get('window').height*.2, 
    //     left: Dimensions.get('window').width*.2, 
    //     top: Dimensions.get('window').height*.4, 
    //     width: Dimensions.get('window').width*.6, 
    //     backgroundColor:"rgba(153, 153, 153, 0.7)",
    //     borderRadius:5,
    //     flexDirection:'column',
    //     alignItems:'center',
    //     justifyContent:'space-evenly',
    // },

    GameOverButton: {
        width:'40%',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        padding:3,
        borderBottomWidth:2,
        borderRightWidth:2,
    },

    GameOverButtonText: {
        fontSize:20
    },
    
});
