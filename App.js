import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './src/Components/Landing.jsx';
import Main from './src/Components/Main.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth" >
          <Stack.Screen name="Auth" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
          </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App