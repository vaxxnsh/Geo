import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LandingPage from './TabHome'
import Map from './Maps'
import FeedbackScreen from './Feedback'
import StudentForm from './Prefer'


const Stack = new createStackNavigator()

export default function TabHomeNew() {
  return (
    <Stack.Navigator initialRouteName="Landing" >
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Admin" component={Map} options={{ headerShown: false }}/>
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown : false}} />
      <Stack.Screen name="Customize" component={StudentForm} options={{headerShown : false}}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})