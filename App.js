import React from 'react'
import { Text } from 'react-native'
import Maps from "./src/Components/Maps.js"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/Pages/Home.jsx";

const Stack = createStackNavigator();
const App = () => {
  return (

<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App