import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';

const JoinLocation = () => {
  const [locationId, setLocationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoinLocation = async () => {
    if (!locationId) {
      setError('Please enter a valid Location ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Joining location with ID:', locationId);

      const response = await axios.post(BASE_URL, {
        locationId: locationId,
      });

      console.log('Response data:', response.data);
      Alert.alert('Success', 'You have successfully joined the location!');

    } catch (err) {
      console.error('Error joining location:', err.message);
      setError('Error joining location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Location ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Location ID"
        value={locationId}
        onChangeText={setLocationId}
        keyboardType="numeric"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        title={loading ? 'Joining...' : 'Join'}
        onPress={handleJoinLocation}
        color="#6200EE"
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#6200EE',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#6200EE',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default JoinLocation;
