import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import Map from '../components/map';


export default function SelectMap({navigation}) {


    return(
        <View style={{flexDirection:'column', width:'100%', height:'100%'}}>
            <ScrollView style={{flexDirection:'column', width:'100%', height:'100%'}}>
                <MapTile map={Map} navigation={navigation} thumbnail='../src/mapThumbnails/map1.jpg'/>
                
            </ScrollView>
        </View>
    )
}



class MapTile extends Component {
    constructor(props) {
        super(props)
        
        //set map component
    }

    render(){
        const {map, navigation, thumbnail} = this.props
        

        return(
        <TouchableOpacity onPress={() => {navigation.navigate("Game", {map: map})}}>
            <View style={{width:'90%', aspectRatio:1, margin:'5%', backgroundColor:'grey', alignItems:'center', justifyContent:'center'}}>
                <Image style={{width:'100%', height:'100%', aspectRatio:1}} source={require('../src/mapThumbnails/map1.jpg')} />
                <Text style={{fontSize:70, 
                    color:'white', 
                    shadowColor:'black', 
                    shadowOpacity:1, 
                    shadowRadius:15, 
                    shadowOffset:{width:1, height:10}, 
                    position: 'absolute', 
                    left:'45%', 
                    top:'35%'}}>1</Text>
            </View>
        </TouchableOpacity>
        )  
    }
}