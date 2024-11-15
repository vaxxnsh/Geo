import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';

const EmployeesAtLocation = ({ route, navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Student Attendance', { employeeId: item._id, employeeName: item.name })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.name}>Name: {item.name}</Text>
        <Text style={styles.email}>Email: {item.email}</Text>
        <Text style={styles.phone}>Phone: {item.phone}</Text>
        <Text style={styles.office}>Hostel ID: {item.office}</Text>
      </View>
    </TouchableOpacity>
  );

  const { office } = route.params;
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const officeId = office._id;

      try {
        const response = await axios.get(`${BASE_URL}admin/getEmployeesByOfficeId/${officeId}`);
        setEmployees(response.data);
      } catch (err) {
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!employees.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No Students found at this location.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#6200EE',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  office: {
    fontSize: 14,
    color: '#333',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    padding: 20,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default EmployeesAtLocation;
