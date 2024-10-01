import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignupScreen from './SignUp';
import HomeScreen from './Home';
import Landing from './Landing';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user';

const Stack = createStackNavigator();

export default function Main() {

  const user = useRecoilState(userState);


  return (
    <Stack.Navigator initialRouteName='Initial'>
        <Stack.Screen name='Initial' component={HomeScreen} options={{headerShown : false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Register" component={SignupScreen} options={{headerShown : false}}/>
        {user.employee && <Stack.Screen name="Landing"  component={Landing} options={{headerShown : false}} />}
    </Stack.Navigator>
  )
}

