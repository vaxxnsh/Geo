import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';


const renderItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.email}>Email: {item.email}</Text>
      <Text style={styles.phone}>Phone: {item.phone}</Text>
      <Text style={styles.office}>Office ID: {item.office}</Text>
    </View>
  </View>
);



const EmployeesAtLocation = ({route}) => {

  const { office } = route.params;
  
  console.log('Params are :',route.params)

  console.log("Office is : ",office);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {

      const officeId = '66f2a3a554b4867d9ee3af36';
      // if (!location || !location.latitude || !location.longitude) {
      //   setError('Invalid location data');
      //   setLoading(false);
      //   return;
      // }

      try {
        console.log(`Fetching employees of officeId : ${officeId}`);

        const response = await axios.get(
          `${BASE_URL}admin/getEmployeesByOfficeId/${officeId}`
        );

        console.log('Response data:', response.data);
        setEmployees(response.data);
        console.log(employees)
        if (response.data.length === 0) {
          setError('No employees found at this location.');
        }

      } catch (err) {
        console.error('Error fetching employees:', err.message);
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#6200EE" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.center}>
        {/* <FlatList
          data={employees}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        /> */}
      </View>
    );
  }

  if (!employees.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No employees found at this location.</Text>
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
  employeeCard: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6200EE',
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  employeeDetails: {
    fontSize: 14,
    color: '#555',
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
    shadowColor: '#6200EE', // Shadow color as specified
    shadowOffset: { width: 0, height: 4 }, // Creates a slightly lifted shadow
    shadowOpacity: 0.3, // Opacity of shadow
    shadowRadius: 4, // Spread of the shadow
    elevation: 10, // Adds shadow on Android
  },
});

export default EmployeesAtLocation;
