import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from '../Components/CustomMarker.jsx';
import axios from 'axios';

export default function Home() {
  const [myLocation, setMyLocation] = useState(null); // Initial state is null to ensure it's updated with actual location later
  const [pin, setPin] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef(null);

  const fetchdata = async () => {
    if (!myLocation) return; // Ensure myLocation is available before running fetch

    try {
      const data = await axios.get("http://192.168.1.4:8000/get");

      // Compare only after myLocation is set
      console.log(myLocation.longitude - data.data.longi)
      console.log(myLocation.latitude - data.data.latii)
      if (
       Math.abs( Math.floor( data.data.longi ) - Math.floor( myLocation.longitude)) <= 0.00001 && 
       Math.abs( Math.floor( data.data.lati ) - Math.floor( myLocation.latitude)) <= 0.00001
      ) {
        console.log("attendance marked");

      } else {
        console.log("attendance not marked");
      }

      console.log( data.data.lati, myLocation.longitude,data.data.longi,myLocation.latitude)
      console.log(myLocation.longitude - data.data.longi)
      console.log(myLocation.latitude - data.data.lati)
    } catch (error) {
      console.log(error);
    }
  };

  // Use effect to get the location when the component mounts
  useEffect(() => {
    _getLocation();
  }, []);

  // Use effect to fetch data once the location has been updated
  useEffect(() => {
    if (myLocation) {
      fetchdata();
    }
  }, [myLocation]); // This runs whenever myLocation changes

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      // If permission is denied, alert the user
      if (status !== 'granted') {
        console.warn('Location Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords); // Set the current location after obtaining it

      // Set the region based on the location obtained
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
    justifyContent: 'flex-end', // Aligns the map to the bottom
    backgroundColor: '#fff',
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
