import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Alllocation from './AllLocations'
import Map from './Maps'
import EmployeesAtLocation from './LocationInfo'

const Stack = createStackNavigator()

export default function SecondInAdmin() {
  return (
    <Stack.Navigator initialRouteName='AllLocations'>
        <Stack.Screen name="AllLocations" component={Alllocation}/>
        <Stack.Screen name="CreateLocation" component={Map}/>
        <Stack.Screen name='EmployeeList' component={EmployeesAtLocation} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})