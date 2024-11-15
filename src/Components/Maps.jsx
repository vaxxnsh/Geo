import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user';

export default function Map() {

  const [user, setUser] = useRecoilState(userState);
  
  const [myLocation, setMyLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [office,setOffice] = useState('');
  const [longi, setlongi] = useState("");
  const [lati, setlati] = useState("");
  const mapRef = useRef(null);

  const handler = async () => {
    try {
      const coordsdata = { 
          adminId : user.admin._id,
          name : office,
          longitude : longi,
          latitude : lati
       };
       console.log(coordsdata);
       console.log(`${BASE_URL}admin/addOffice`)
      const sendeddata = await axios.post(`${BASE_URL}admin/addOffice`, coordsdata);
      console.log(sendeddata.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const currentHandler = () => {
     // Add this to see what's being set
    if (myLocation.latitude && myLocation.longitude) {
      setlongi(String(myLocation.longitude)); // Ensure it's a string for the TextInput
      setlati(String(myLocation.latitude));  // Ensure it's a string for the TextInput
    } else {
      console.warn("Location data not available");
    }
  };

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    } catch (err) {
      console.warn('Error getting location:', err);
    }
  };

  useEffect(() => {
    _getLocation();
    let subscription;
    (async () => {
      try {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setMyLocation({ latitude, longitude });
            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
                1000
              );
            }
          }
        );
      } catch (err) {
        console.warn('Error watching position:', err);
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.inputBox}
          placeholder="Office name"
          value={office}
          onChangeText={setOffice}
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Set longitude"
          value={longi}
          onChangeText={setlongi}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Set latitude"
          value={lati}
          onChangeText={setlati}
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity style={styles.button} onPress={() => handler()}>
          <Text style={styles.buttonText}>Send longitude and latitude</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => currentHandler()}>
          <Text style={styles.buttonText}>Send your current location</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        {myLocation.latitude && myLocation.longitude && (
          <Marker
            coordinate={myLocation}
            title="My current location"
            description="I am here"
          />
        )}
      </MapView>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          Latitude: {myLocation.latitude.toFixed(5)}, Longitude: {myLocation.longitude.toFixed(5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f4f7', // Light background color
  },
  inputContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputBox: {
    width: '100%',
    height: 50,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    borderRadius: 20,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#000',
  },
});