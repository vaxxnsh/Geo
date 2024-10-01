import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const EmployeeInfo = () => {
  const [response, setResponse] = useState([]);
  const EmployeeId = "66f2a45754b4867d9ee3af41";

  const fetchedData = async () => {
    try {
      const { data } = await axios.get(`http://192.168.137.1:3000/user/getAttendanceByEmpId/${EmployeeId}`);
      setResponse(data); // Ensure data is structured correctly to map
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {response.length > 0 ? (
        response.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Employee ID: {item.employeeId}</Text>
            <Text style={styles.text}>Check-in Time: {item.checkin_time}</Text>
            <Text style={styles.text}>Check-out Time: {item.checkout_time}</Text>
            <Text style={styles.text}>Total Hours: {item.total_hours}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>Loading Data...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
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