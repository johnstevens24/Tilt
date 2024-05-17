import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import Styles from '../styleSheets/selectMapScreen'


export default function SelectMap({navigation}) {
    const mapIDs = [1, 2]

    return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%'}}>
            <View style={Styles.Banner}>
                <Text style={Styles.Title}>LEVELS</Text>
            </View>
            <ScrollView style={{flex:1, flexDirection:'column', width:'100%'}}>
                {mapIDs.map((id) => (<MapTile key={id} navigation={navigation} id={id}/>))}
            </ScrollView>
        </SafeAreaView>
    )
}



class MapTile extends Component {

    thumbnails = [require('../src/mapThumbnails/map1.jpg'), require('../src/mapThumbnails/map2.jpg')]

    constructor(props) {
        super(props);
        this.id = props.id;
    }

    render() {
        const { navigation } = this.props;
      
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("Game", {mapID: this.id})}}>
                <View style={{width:'90%', aspectRatio:1, margin:'5%', backgroundColor:'grey', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:'100%', height:'100%', aspectRatio:1}} source={this.thumbnails[this.id-1]} />
                    <Text style={{fontSize:70, 
                        color:'white', 
                        shadowColor:'black', 
                        shadowOpacity:1, 
                        shadowRadius:15, 
                        shadowOffset:{width:1, height:10}, 
                        position: 'absolute', 
                        left:'45%', 
                        top:'35%'}}>{this.id}</Text>
                </View>
            </TouchableOpacity>
        );  
    }
}