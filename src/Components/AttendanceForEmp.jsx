import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user.js';

const EmployeeInfo = () => {
  const [user] = useRecoilState(userState);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EmployeeId = user.employee._id;

  const fetchedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}user/getAttendanceByEmpId/${EmployeeId}`);
      setResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const handleRefresh = () => {
    fetchedData();
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Employee ID: {item.employeeId}</Text>
      <Text style={styles.text}>Check-in Time: {item.checkin_time}</Text>
      <Text style={styles.text}>{item.checkout_time ? `Check-out Time: ${item.checkout_time}` : "Not Known"}</Text>
      <Text style={styles.text}>{item.checkout_time ? `Total Hours: ${item.total_hours}` : "Not Known"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      {loading && <Text style={styles.loadingText}>Loading Data...</Text>}
      {error && <Text style={styles.loadingText}>Error: {error}</Text>}
      {response.length === 0 && !loading && !error && (
        <Text style={styles.loadingText}>No Attendance Found</Text>
      )}
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 25,
    backgroundColor: '#f2f2f2',
  },
  refreshButton: {
    backgroundColor: '#6200EE', // Set the background color
    padding: 10,
    borderRadius: 30, // Make it rounded
    alignItems: 'center', // Center the text
    marginBottom: 20, // Add some space below
  },
  refreshButtonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});

export default EmployeeInfo;
