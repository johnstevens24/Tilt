import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Game from './components/game.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', 
      backgroundColor:'#ddd', 
      width:'100%', 
      height:'8%', 
      padding:'3%', 
      borderBottomWidth:"2px",
      alignItems:'center',
      justifyContent:'center'}}>
        <TouchableOpacity style={{backgroundColor:'#aaa', padding:"2%", borderRadius:10}}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
      <Game/> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
