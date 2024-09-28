import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AttendanceComponent = () => {
  const collegeName = "Coer College";
  const date = "27/09/2024";
  const attendanceStatus = "marked"; // You can change this to "not marked" or other statuses as needed

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Status</Text>
      <View style={styles.attendanceCard}>
        <Text style={styles.collegeName}>{collegeName}</Text>
        <Text style={styles.attendanceMessage}>
          Attendance is {attendanceStatus} for {collegeName} on {date}.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  attendanceCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  collegeName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  attendanceMessage: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AttendanceComponent;
