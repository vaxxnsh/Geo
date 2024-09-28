import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import axios from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { z } from "zod";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


const adminSchema = z.object({
  name : z.string().min(2),
  email : z.string().email(),
  password : z.string().min(6).max(16),
  company : z.string().optional(),
  phone : z.string().min(10).max(10)
})

const empSchema = adminSchema.omit({company : true})

const SignupScreen = ({navigation} ) => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);
  
  const handleSignup = async () => {

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('user', value);
      } catch (e) {
        console.log(e)
        Alert.alert("Error while logging In")
      }
    };

    const formValues= {
      name: fullname,
      email: email,
      phone: phone,
      password: password,
      company: company
    }
    console.log(formValues)
    const val = isAdmin ? adminSchema.safeParse(formValues) : empSchema.safeParse(formValues)

    if(!val.success) {
      Alert.alert("Invalid Inputs")
      console.log(JSON.stringify(val.error))
      return;
    }
    
    try {
      const response = await axios.post(
        `${"http://192.168.1.4:3000"}${isAdmin ? "/admin" : "/user"}/signup`,
        formValues
      )
      .catch((err) => console.log(err))

      if(response.data?.token) {
        const user = jwtDecode(response.data.token) 
        storeData(JSON.stringify(user))
        console.log(user)
        navigation.navigate('Landing')
      }
      else {
        Alert.alert(`${isAdmin ? "Admin" : "Employee"} not found`)
      }
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register {process.env.BASE_URL}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullname}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {isAdmin && 
        <TextInput
        style={styles.input}
        placeholder="Enter your Company"
        placeholderTextColor="#aaa"
        value={company}
        onChangeText={setCompany}
      />}

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        secureTextEntry={true}
      />
      <View className='flex flex-row'>
        <BouncyCheckbox 
          isChecked={isAdmin}
          useBuiltInState={false}
          fillColor='#6200EE'
          onPress={() => {
          setIsAdmin(!isAdmin)
        }}
        />
        <Text className='text-xl text-black'>Are you Admin ?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText} >Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
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
  loginText: {
    marginTop: 15,
    color: '#6200EE',
    fontSize: 14,
  },
});

export default SignupScreen;