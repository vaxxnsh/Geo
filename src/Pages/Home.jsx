import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from '../Components/CustomMarker.jsx';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../Store/user';
import Map from '../Components/Maps.jsx';
import SecondInAdmin from '../Components/SecondInAdmin.jsx';


export default function Home() {

  const [user, setUser] = useRecoilState(userState);
  console.log("In User Map", user.employee)

  if(user.admin) {
    return <SecondInAdmin />
  }

  console.log(user);

  async function updateAttendance() {
      axios.post()
  }

  const [myLocation, setMyLocation] = useState(null);
  const [pin, setPin] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [region, setRegion] = useState({
    latitude: 29.89168,
    longitude: 77.96022,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef(null);

  // Define the geofencing radius in meters (e.g., 50 meters)
  const GEOFENCE_RADIUS = 200;

  const fetchdata = async () => {
    if (!myLocation) return;



    try {
     // const data = await axios.get("http://192.168.1.4:8000/get");

    //  const targetLatitude = data.data.lati;
     // const targetLongitude = data.data.longi;
     const targetLatitude = "30.34301"
     const targetLongitude = "77.88683"
      const distance = calculateDistance(
        myLocation.latitude,
        myLocation.longitude,
        targetLatitude,
        targetLongitude
      );

      console.log('Distance to target:', distance, 'meters');

      // Check if the user is within the geofence radius
      if (distance <= GEOFENCE_RADIUS) {
        Alert.alert("Attendance marked!");
        console.log("Attendance marked");
      } else {
        console.log("Outside geofence. Attendance not marked");
        Alert.alert("Outside geofence. Attendance not marked");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _getLocation();
  }, []);

  useEffect(() => {
    if (myLocation) {
      fetchdata();
    }
  }, [myLocation]);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.warn('Location Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (err) {
      console.warn('Error getting location:', err);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon1 - lon2); // Longitude difference
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
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
      >
        {myLocation?.latitude && myLocation?.longitude && (
          <>
            <Marker
              coordinate={myLocation}
              title="My current location"
              description="I am here"
            />
            <CustomMarker
              coordinate={myLocation}
              title="My current location"
            />
          </>
        )}
        {pin.latitude && pin.longitude && (
          <Marker
            coordinate={pin}
            title="Default location"
            description="I am here"
          />
        )}
      </MapView>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          Latitude: {myLocation?.latitude?.toFixed(5)}, Longitude: {myLocation?.longitude?.toFixed(5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height,
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