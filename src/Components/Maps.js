import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from './CustomMarker';
import axios from 'axios';
export default function Map() {

  
const handler = async () => {
try {
  const coordsdata = {longi , lati}
  console.log(coordsdata)
  const sendeddata = await axios.post("http://192.168.29.151:8000/post"  , coordsdata)
  console.log(sendeddata)
} catch (error) {
  console.log(error)
}
}


  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const [myLocation, setMyLocation] = useState(initialLocation);
  const [pin, setPin] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [ longi  , setlongi] = useState("")
  const [ lati , setlati] = useState("") // State to hold input text
  const mapRef = useRef(null);

  // Geofence
  const geofence = {
    latitude: lati,
    longitude: longi,
    radius: 100,
  };
 // console.log(lati)

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
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            // Geofence logic
            checkGeofence(latitude, longitude);

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

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      // If permission is denied, alert the user
      if (status !== 'granted') {
        console.warn('Location Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    } catch (err) {
      // Handle error or rejection of location services
      console.warn('Error getting location:', err);
    }
  };

  // Geofence logic
  const checkGeofence = (latitude, longitude) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      geofence.latitude,
      geofence.longitude
    );

    if (distance <= geofence.radius) {
     // console.log('Inside the geofence!');
     // Alert.alert('Inside Geofenced Area', `You are Inside the geofenced area.`);
    } else {
     // console.log('Outside the geofence!');
     // Alert.alert('Exited Geofenced Area', `You are outside the geofenced area.`);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in meters
  };

  return (
    <View style={styles.container}>



      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputBox}
          placeholder="Set longitude"
          value={longi}
          onChangeText={setlongi}

       />
        <TextInput 
          style={styles.inputBox}
          placeholder="Set lattitude"
          value={lati}
          onChangeText={setlati}

       />
       <Button title="Send longitude and lattitude" onPress={handler} ></Button>
       
      </View>




      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
      >
        {myLocation.latitude && myLocation.longitude && (
          <>
            <Marker
              coordinate={myLocation}
              title="My current location"
              description="I am here"
            />
            <CustomMarker coordinate={myLocation} title="My current location" />
          </>
        )}
        {pin.latitude && pin.longitude && (
          <Marker coordinate={pin} title="Default location" description="I am here" />
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
    justifyContent: 'flex-end', // Aligns the map to the bottom
    backgroundColor: '#fff',
  },
  inputContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure input is above the map
    alignItems: 'center',
  },
  inputBox: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height / 2, // Set height to half of the screen
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
