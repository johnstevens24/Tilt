import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Game from "./screens/game"
import SplashScreen from "./screens/splashScreen"
import ScoreScreen from "./screens/scoreScreen"
import SelectMap from './screens/selectMap';

const Stack = createNativeStackNavigator();
// Change status bar color
StatusBar.setBarStyle('dark-content');

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SelectScreen" screenOptions={{ headerShown: false, gestureEnabled: false  }}>
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
        <Stack.Screen name="SelectScreen" component={SelectMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;