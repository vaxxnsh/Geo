import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Switch, RadioButton, Chip, Text, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userState } from '../Store/user';
import { useRecoilState } from 'recoil';
import { date } from 'zod';
import axios from 'axios';
import { BASE_URL } from '../constants';
import MatchingRoommates from './MatchingRoomates';

const StudentForm = () => {
  const [user, setUser] = useRecoilState(userState);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [nightOwl, setNightOwl] = useState(false);
  const [cleanlinessLevel, setCleanlinessLevel] = useState('Medium');
  const [hobbies, setHobbies] = useState([]);

  const toggleHobby = (hobby) => {
    setHobbies(prevHobbies =>
      prevHobbies.includes(hobby)
        ? prevHobbies.filter(h => h !== hobby)
        : [...prevHobbies, hobby]
    );
  };

  const handleSendFeedBack = async () =>  {
    const formBody = {
      StudentId : user.employee._id,
       budget : Number(budget), lifestyle : {cleanlinessLevel,nightOwl}, location, hobbies
    }
    try {
      const response = await axios.post(`${BASE_URL}user/createProfile`,formBody);
      if(!response.data.error)
      Alert.alert(response?.data.message);
      
    }
    catch(err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        { user.employee?._id ? 
          <>
              <TextInput
                label="Budget"
                value={budget}
                onChangeText={setBudget}
                placeholder='E.g. 10,000 - 20,000'
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                theme={{ colors: { primary: '#6200EE' } }}
              />
              <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: '#6200EE' } }}
              />
              <View style={styles.switchContainer}>
                <Text>Night Owl</Text>
                <Switch
                  value={nightOwl}
                  onValueChange={setNightOwl}
                  color="#6200EE"
                />
              </View>
            <Text style={styles.radioLabel}>Cleanliness Level:</Text>
            <RadioButton.Group
              onValueChange={newValue => setCleanlinessLevel(newValue)}
              value={cleanlinessLevel}
            >
              {['Low', 'Medium', 'High'].map(level => (
                <View key={level} style={styles.radioItem}>
                  <RadioButton value={level} color="#6200EE" />
                  <Text>{level}</Text>
                </View>
              ))}
            </RadioButton.Group>
            <Text style={styles.hobbiesLabel}>Hobbies:</Text>
            <View style={styles.hobbyChips}>
              {['Reading', 'Sports', 'Music', 'Traveling'].map(hobby => (
                <Chip
                  key={hobby}
                  selected={hobbies.includes(hobby)}
                  onPress={() => toggleHobby(hobby)}
                  style={styles.chip}
                  selectedColor="#6200EE"
                >
                  {hobby}
                </Chip>
              ))}
            </View>
            <Button mode="contained" onPress={handleSendFeedBack} style={styles.button} buttonColor="#6200EE">
              Submit
            </Button>
          </>

          : 

          <>
              <MatchingRoommates/>
          </>
        }
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioLabel: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  hobbiesLabel: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  hobbyChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  chip: {
    margin: 4,
  },
  button: {
    marginTop: 20,
  },
});

export default StudentForm;