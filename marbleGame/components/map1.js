import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity} from 'react-native';
import { BlurView } from 'expo-blur';


class Map1 extends Component {
  constructor(props) {
      super(props);
      //needed to calculate maps that will be proportional across different sized devices. If you calculate with percentages, things appear fine but collisions won't be detected.
      //this app was developed on a screen that is 
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
        { left: 93*widthMultiplier, top: 465*heightMultiplier, width: 60*widthMultiplier, height: 60*heightMultiplier},
      ];

    }

  checkCollision(x, y) {
    //the ball's "center" is actuall at the very top of the ball. This recenters it for collision detection.
    y=y+25
    for (let i = 0; i < this.rectangles.length; i++) {
      const rect = this.rectangles[i];
      if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
        // Collision detected, return true
        return true;
      }
    }
    // No collision detected, return false
    return false;
  }

  render() {

    return (
      <View>
        {/* {this.rectangles.map((rect, index) => (
          <View key={index} style={{ position: 'absolute', left: rect.left+3, top: rect.top+3, width: rect.width+3, height: rect.height+3, backgroundColor:'#c9c9c9'}} />
        ))} */}
        {this.rectangles.map((rect, index) => (
          <View key={index} style={{ position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height, backgroundColor: 'grey' }} />
        ))}
      </View>
    );
  }
}

export default Map1