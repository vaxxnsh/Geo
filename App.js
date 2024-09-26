import React from 'react'
import Maps from "./src/Components/Maps.jsx"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/Pages/Home.jsx";
import Landing from './src/Components/Landing.jsx';

const Stack = createStackNavigator();
const App = () => {
  return (

<NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Landing" component={Landing}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App