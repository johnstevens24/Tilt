import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Game from "./screens/game"
import SplashScreen from "./screens/splashScreen"
import ScoreScreen from "./screens/scoreScreen"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Game" screenOptions={{ headerShown: false, gestureEnabled: false  }}>
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;