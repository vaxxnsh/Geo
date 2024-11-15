import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { z } from "zod";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user.js';
import { BASE_URL } from '../constants.js';

const loginSchema = z.object({
  email : z.string().email(),
  password : z.string().min(6).max(16),
})

const LoginScreen = ({navigation}) => {
  const [user,setUser] = useRecoilState(userState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (e) {
      Alert.alert("Error while logging In")
    }
  };

  const handleLogin = async () => {
    let loginForm = {email,password}
    let fetchUrl = isAdmin? "" : ""

    const validate = loginSchema.safeParse(loginForm)

    if(!validate.success) {
      Alert.alert("Invalid email or password")
      return
    }

    console.log(`${BASE_URL}${isAdmin ? "admin" : "user"}/signin`)

    console.log(loginForm)
    
    try {
      const response = await axios.post(
        `${BASE_URL}${isAdmin ? "admin" : "user"}/signin`,
        loginForm
      )
      .catch((err) => console.log(err))

      if(response.data?.token) {
        const user = jwtDecode(response.data.token) 
        await storeData(JSON.stringify(user))
        console.log(user)
        setUser(user);
        navigation.navigate('Landing')
      }
      else {
        Alert.alert(`${isAdmin ? "Admin" : "Student"} not found`)
      }
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <View className='flex flex-row py-4'>
        <BouncyCheckbox 
          isChecked={isAdmin}
          useBuiltInState={false}
          fillColor='#6200EE'
          onPress={() => {
          setIsAdmin(!isAdmin)
        }}
        />
        <Text className='text-lg text-black'>Are you Admin ?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.forgotText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color : "black"
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {
    marginTop: 15,
    color: '#6200EE',
    fontSize: 14,
  },
});

export default LoginScreen;