import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import axios, { all } from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { z } from "zod";


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
      Alert.alert(JSON.stringify(val.error))
      console.log(JSON.stringify(val.error))
      return;
    }
    
    try {
      const signupData = {
        name: fullname,
        email: email,
        company: company,
        phone: phone,
        password: password,
      };
      const response = await axios.post(
        `${process.env.BASE_URL} ${isAdmin ? "/admin" : "/user"}/signup`,
        signupData
      );
    
      console.log(response.data.message);
    } catch (err) {
      // Ensure err is of type AxiosError
      const error = err;
    
      if (error.response) {
        // Server responded with a status code that falls out of the range of 2xx
        console.log('Error Response:', error.response.data);
        console.log('Status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.log('Error:', error.message);
      }
      console.log('Error while signing up');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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