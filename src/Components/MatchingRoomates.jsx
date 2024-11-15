import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../constants';

const MatchingRoommates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}admin/getpairs/66f2a3a554b4867d9ee3af36`);

        const responseData = res.data;
        if (responseData && responseData.length > 0) {
          setData(responseData); // Store the entire array
        }
      } catch (e) {
        Alert.alert('Error', e.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Matching Roommates</Text>
      
      {data.map((item, index) => (
        <View key={index} style={styles.roommatesContainer}>
          {/* Render each field in the object, excluding metadata fields */}
          {Object.entries(item).map(([label, id]) => (
            label !== '_id' && label !== 'createdAt' && label !== '__v' && (
              <View key={label} style={styles.roommateItem}>
                <Ionicons
                  name={label === 'Hostel' ? 'home-outline' : 'person-circle-outline'}
                  size={36}
                  color="#6200EE"
                />
                <Text style={styles.itemText}>{label}: {id}</Text>
              </View>
            )
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6200EE',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  roommatesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  roommateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default MatchingRoommates;
