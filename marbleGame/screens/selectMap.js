import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';



export default function SelectMap({navigation}) {
    const mapIDs = [1, 2]

    return(
        <View style={{flexDirection:'column', width:'100%', height:'100%'}}>
            <ScrollView style={{flexDirection:'column', width:'100%', height:'100%'}}>
                {
                    mapIDs.map((id) => (<MapTile key={id} navigation={navigation} id={id}/>))
                }
                
            </ScrollView>
        </View>
    )
}



class MapTile extends Component {
    
    constructor(props) {
        super(props);
        this.id = props.id;
        const temp = parseInt(this.id);
        console.log(temp);
        // Constructing the image path
        // this.image = require(`../src/mapThumbnails/map${temp}.jpg`);
    }

    render() {
        const { navigation } = this.props;
      
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("Game", {mapID: this.id})}}>
                <View style={{width:'90%', aspectRatio:1, margin:'5%', backgroundColor:'grey', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:'100%', height:'100%', aspectRatio:1}} source={this.image} />
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