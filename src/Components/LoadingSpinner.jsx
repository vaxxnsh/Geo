import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // First set up the animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,  // 1 second
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Next, interpolate beginning and end values for rotation (0 and 360)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        {/* You can use this View to create a custom spinner shape */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF', // Adjust as per your need
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#6200EE',  // Primary color
    borderTopColor: 'transparent',  // Top part transparent to give spinning effect
  },
});

export default LoadingSpinner;