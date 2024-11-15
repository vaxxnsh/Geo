
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../constants';
import { userState } from '../Store/user';
import { useRecoilState } from 'recoil';

const FeedbackScreen = ({navigation}) => {
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  console.log(user.employee)
  let Head
  if(user.employee) {
    Head = "Form"
  }
  else {
    Head = "List"
  }
  const handleSendFeedBack = async () =>  {
    try {
      const response = await axios.post(`${BASE_URL}user/markFeedback/`,{
        employeeID : user.employee._id,
        title : feedbackTitle,
        content : feedbackContent,
      })
      return response
    }
    catch(err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  }

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}user/getFeeds/`);
      console.log(response.data);
      setFeedbackList(response.data)
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const submitFeedback = async () => {
    if (!feedbackTitle || !feedbackContent) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      const res = await handleSendFeedBack();
      console.log(res.data.status === "success");
      if(res.data.status === "success") {
        setFeedbackTitle('');
        setFeedbackContent('');
        Alert.alert("Feedback Registered")
      }
      else {
        Alert.alert("Error while sending the requests")
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  },[])

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackTitle}>{item.title}</Text>
      <Text style={styles.feedbackContent}>{item.content}</Text>
    </View>
  );
  console.log(feedbackList.length)
  return (
    <View style={styles.container}>
        <SafeAreaView>
        
      
      
      { !user.employee ? 

        <View>
                  <Text style={styles.subHeader}>Feedback List</Text>
      
                <FlatList
                  data={feedbackList}
                  renderItem={renderFeedbackItem}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.feedbackList}
                />
        </View> : 

        <>

<Text style={styles.header}>Feedback Form</Text>
<TextInput
  style={styles.input}
  placeholder="Feedback Title"
  value={feedbackTitle}
  onChangeText={setFeedbackTitle}
/>
<TextInput
  style={[styles.input, styles.contentInput]}
  placeholder="Feedback Content"
  value={feedbackContent}
  onChangeText={setFeedbackContent}
  multiline
/>
<TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
  <Text style={styles.submitButtonText}>Submit Feedback</Text>
</TouchableOpacity>
        </>

      }
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6200EE',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  contentInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedbackList: {
    paddingTop: 10,
  },
  feedbackItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#6200EE',
    borderWidth: 1,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  feedbackContent: {
    fontSize: 16,
    color: '#333',
  },
});

export default FeedbackScreen;
