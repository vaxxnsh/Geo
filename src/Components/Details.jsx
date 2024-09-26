import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function Details({navigation}) {
  return (
    <View className='bg-red-500 justify-center items-center h-screen'>
      <Text className='text-white'>Details</Text>
      <Button title='Go Back to  Home' onPress={() => navigation.navigate('Home')}/>
    </View>
  )
}

const styles = StyleSheet.create({})