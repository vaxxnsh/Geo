import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



const HomeScreen = ({ navigation }) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DormEase{process.env.BASE_URL}</Text>
      <Text style={styles.subtitle}>Location-Verified Attendance, Simplified.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
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
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#000', 
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6200EE',
  },
  signupButtonText: {
    color: '#6200EE',
  },
});

export default HomeScreen;
