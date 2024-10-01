import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user';

const LandingPage = ({ navigation }) => {
  console.log("In Landing");
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true); // Loading state

  console.log(user.employee)

  const goToInitialScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Set user in Recoil state
      } else {
        goToInitialScreen(); // Navigate to Auth page if no user found
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      goToInitialScreen(); // Navigate to Auth page if an error occurs
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      Alert.alert('Logged out', 'You have been successfully logged out!');
      goToInitialScreen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user when component mounts
  }, []);

  console.log(user);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>AttendEase</Text>
        <Image 
          style={styles.bannerImage} 
          source={require('../../assets/geolocation-banner.png')} 
          resizeMode="stretch" 
        />
        <Text style={styles.subtitle}>Streamline Employee Attendance Across Multiple Office Locations</Text>
        <Text style={styles.paragraph}>
          This app automates attendance tracking by leveraging geolocation to record check-in and check-out times within a 200-meter radius of office locations. Manual check-ins are available for offsite work, enhancing operational efficiency and accuracy.
        </Text>
        <Text style={styles.featureTitle}>Key Features:</Text>
        <Text style={styles.bulletPoint}>• Automatic Geolocation-Based Check-In/Check-Out</Text>
        <Text style={styles.bulletPoint}>• Manual Check-In/Out for Offsite Work</Text>
        <Text style={styles.bulletPoint}>• Total Work Hours Calculation</Text>
        <Text style={styles.bulletPoint}>• Real-Time Data Sync & Tamper-Proof Records</Text>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('VideoPage')}
        >
          <Text style={styles.linkText}>Watch Problem Statement Video</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#666',
  },
  bannerImage: {
    width: 290,
    height: 200,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#6200EE',
    borderRadius: 15,
  },
  title: {
    width: '100%',
    backgroundColor: '#6200EE',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  bulletPoint: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#6200EE',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LandingPage;
