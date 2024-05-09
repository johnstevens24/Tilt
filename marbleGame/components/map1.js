import rectangle from "./rectangle"
import { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity} from 'react-native';


class Map1 extends Component {
  constructor(props) {
      super(props);
      this.rectangles = [
        { left: "10%", top: 0, width: 50, height: 60 },
        { left: 100, top: 100, width: 80, height: 70 },
      ];
    }

  checkCollision(x, y) {
    // Iterate over the rectangles array
    for (let i = 0; i < this.rectangles.length; i++) {
      const rect = this.rectangles[i];
      // Check if the given coordinates (x, y) fall within the rectangle's boundaries
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
        {this.rectangles.map((rect, index) => (
          <View key={index} style={{ position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height, backgroundColor: 'blue' }} />
        ))}
      </View>
    );
  }
}

export default Map1