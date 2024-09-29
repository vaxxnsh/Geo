import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Landing.jsx';
import Main from './Main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from './LoadingSpinner.jsx';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user.js';

const Stack = createStackNavigator();

const Index = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);  // Add loading state

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const setData = async () => {
    const data = await getData('user');
    console.log(data)
    if (data) {
      setUser(JSON.parse(data));
      console.log(user)
    }
    console.log(user)
    setLoading(false);  // Set loading to false after the async operation
  };

  useEffect(() => {
    setData();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Optionally, you can render a loading spinner here
  }

  return (
    
      
        <Stack.Navigator initialRouteName={user ? "Landing" : "Auth"}>
          <Stack.Screen name="Auth" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        </Stack.Navigator>
     

  );
};

export default Index;