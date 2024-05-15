import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity} from 'react-native';

class Map1 extends Component {
    constructor(props) {
        super(props);
        widthMultiplier = Dimensions.get('window').width/375
        heightMultiplier = Dimensions.get('window').height/667
        // hOffset = .9 //this is used to take into account the 10 percent of the screen that is covered by the top bar
        this.rectangles = [
          { left: -188*widthMultiplier, top: 0, width: 240*widthMultiplier, height: 60*heightMultiplier},
          { left: -188*widthMultiplier, top: 0, width: 60*widthMultiplier, height: 180*heightMultiplier},
          { left: -188*widthMultiplier, top: 180*heightMultiplier, width: 200*widthMultiplier, height: 60*heightMultiplier},
          { left: 12*widthMultiplier, top: 120*heightMultiplier, width: 60*widthMultiplier, height: 120*heightMultiplier},
          { left: 60*widthMultiplier, top: 120*heightMultiplier, width: 188*widthMultiplier, height: 60*heightMultiplier},
          { left: 127*widthMultiplier, top: 180*heightMultiplier, width: 188*widthMultiplier, height: 215*heightMultiplier},
          { left: 0*widthMultiplier, top: 335*heightMultiplier, width: 150*widthMultiplier, height: 60*heightMultiplier},
          { left: 0*widthMultiplier, top: 275*heightMultiplier, width: 60*widthMultiplier, height: 60*heightMultiplier},
          { left: -90*widthMultiplier, top: 275*heightMultiplier, width: 120*widthMultiplier, height: 60*heightMultiplier},
          { left: -90*widthMultiplier, top: 335*heightMultiplier, width: 60*widthMultiplier, height: 130*heightMultiplier},
          { left: -187*widthMultiplier, top: 405*heightMultiplier, width: 100*widthMultiplier, height: 60*heightMultiplier},
          { left: -187*widthMultiplier, top: 465*heightMultiplier, width: 60*widthMultiplier, height: 120*heightMultiplier},
          { left: -187*widthMultiplier, top: 525*heightMultiplier, width: 340*widthMultiplier, height: 60*heightMultiplier},
          {left: 93*widthMultiplier, top: 465*heightMultiplier, width: 60*widthMultiplier, height: 60*heightMultiplier}, //a duplicate of the finish tile needs to be in here so that it can properly draw the shadow and not overlap onto anything
        ];
  
        this.finishTile = {left: 93*widthMultiplier, top: 465*heightMultiplier, width: 60*widthMultiplier, height: 60*heightMultiplier}
  
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

export default Map1