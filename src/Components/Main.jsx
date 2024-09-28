import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignupScreen from './SignUp';
import HomeScreen from './Home';
import Landing from './Landing';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <Stack.Navigator initialRouteName='Initial'>
        <Stack.Screen name='Initial' component={HomeScreen} options={{headerShown : false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Register" component={SignupScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Landing"  component={Landing} options={{headerShown : false}} />
    </Stack.Navigator>
  )
}

