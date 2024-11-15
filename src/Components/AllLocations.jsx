import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native';

const Alllocation = ({navigation}) => {
  const [offices, setOffices] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/getOfficesByAdminId/${user.admin._id}`);
      setOffices(response.data.offices);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Function to render each office item
  const renderOffice = ({ item: office }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Student List', { office })}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hostel Name: {office.name}</Text>
        <Text style={styles.cardText}>Hostel ID: {office._id}</Text>
        <Text style={styles.cardText}>Latitude: {office.latitude}</Text>
        <Text style={styles.cardText}>Longitude: {office.longitude}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.userId}>Hello, {user.admin.name}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}onPress={() => navigation.navigate('Create Hostel')}>Create more Locations</Text>
      </TouchableOpacity>

      <Text style={{
        fontSize: 18,
        paddingTop : 15,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
        }}>Here are your Hostels</Text>

      {/* Using FlatList to render the offices */}
      <FlatList
        data={offices}
        keyExtractor={(item) => item._id}
        renderItem={renderOffice}
        contentContainerStyle={{ paddingBottom: 20 }} // Extra padding for smooth scrolling
      />
    </View>
  );
};

export default Alllocation;

const styles = StyleSheet.create({
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f9', // Light background color for the entire page
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff', // White background for the card
    padding: 16,
    marginVertical: 8,
    borderRadius: 10, // Rounded corners for the card
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd', // Subtle border for a cleaner look
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50', // Darker text color for the title
    marginBottom: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#7f8c8d', // Lighter gray color for additional details
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#6200EE', // Change this to your desired color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
