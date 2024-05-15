import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity} from 'react-native';


class Map2 extends Component {
  constructor(props) {
      super(props);
      // //needed to calculate maps that will be proportional across different sized devices. If you calculate with percentages, things appear fine but collisions won't be detected.
      // //this app was developed on a screen that is 
      widthMultiplier = Dimensions.get('window').width/375
      heightMultiplier = Dimensions.get('window').height/667
      // hOffset = .9 //this is used to take into account the 10 percent of the screen that is covered by the top bar
      this.rectangles = [
        { left: -40*widthMultiplier, top: 0, width: 200*widthMultiplier, height: 60*heightMultiplier},
        { left: 100*widthMultiplier, top: 0, width: 60*widthMultiplier, height: 160*heightMultiplier},
        { left: 75*widthMultiplier, top: 150, width: 60*widthMultiplier, height: 50*heightMultiplier},
        { left: 50*widthMultiplier, top: 180, width: 60*widthMultiplier, height: 50*heightMultiplier},
        { left: 25*widthMultiplier, top: 210, width: 60*widthMultiplier, height: 120*heightMultiplier},
        { left: 25*widthMultiplier, top: 330, width: 120*widthMultiplier, height: 60*heightMultiplier},
        { left: 100*widthMultiplier, top: 330, width: 60*widthMultiplier, height: 240*heightMultiplier},
        { left: -20*widthMultiplier, top: 515, width: 130*widthMultiplier, height: 30*heightMultiplier},
        { left: -80*widthMultiplier, top: 415, width: 60*widthMultiplier, height: 150*heightMultiplier},
        { left: -160*widthMultiplier, top: 415, width: 140*widthMultiplier, height: 60*heightMultiplier},
        { left: -150*widthMultiplier, top: 280, width: 40*widthMultiplier, height: 140*heightMultiplier},
        { left: -160*widthMultiplier, top: 260, width: 60*widthMultiplier, height: 60*heightMultiplier}, //a duplicate of the finish tile needs to be in here so that it can properly draw the shadow and not overlap onto anything
      ];

      this.finishTile = { left: -160*widthMultiplier, top: 260, width: 60*widthMultiplier, height: 60*heightMultiplier}

    }

  render() {

    return (
      <View>
        {this.rectangles.map((rect, index) => (
          <View key={index} style={{ position: 'absolute', left: rect.left+3, top: rect.top+3, width: rect.width+3, height: rect.height+3, backgroundColor:'#c9c9c9'}} />
        ))}
        {this.rectangles.map((rect, index) => (
          <View key={index} style={{ position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height, backgroundColor: 'grey' }} />
        ))}
        
        <View style={{ position: 'absolute', left: this.finishTile.left, top: this.finishTile.top, width: this.finishTile.width, height: this.finishTile.height, backgroundColor: 'green' }}></View>
      </View>
    );
  }
}

export default Map2