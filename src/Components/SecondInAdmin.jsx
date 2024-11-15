import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Alllocation from './AllLocations'
import Map from './Maps'
import EmployeesAtLocation from './LocationInfo'
import EmployeeInfo from './ComponentforAdmin'

const Stack = createStackNavigator()

export default function SecondInAdmin() {
  return (
    <Stack.Navigator initialRouteName='AllLocations'>
        <Stack.Screen name="AllLocations" component={Alllocation}/>
        <Stack.Screen name="Create Hostel" component={Map}/>
        <Stack.Screen name='Student List' component={EmployeesAtLocation} />
        <Stack.Screen name='Student Attendance' component={EmployeeInfo} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})