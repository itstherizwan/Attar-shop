
  

import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation,  } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const [focusedScreen, setFocusedScreen] = useState('home');
  

  useEffect(() => {
    // Set the initial focused screen when the component mounts
    setFocusedScreen('home');
  }, []);



  useEffect(() => {
    // Set the initial focused screen when the component mounts
    setFocusedScreen('home');

    // Listen for changes in the navigation state
    const unsubscribe = navigation.addListener('state', (e) => {
        // Check if the navigation state and routes are defined
        if (e.data.state && e.data.state.routes) {
          const currentRoute = e.data.state.routes[e.data.state.index].name;
          setFocusedScreen(currentRoute);
        }
      });

    return unsubscribe;
  }, [navigation]);

//   console.log(focusedScreen)

    const isHomeFocused = focusedScreen === 'home';
    const isProfileFocused = focusedScreen === 'profile';
    const isHotFeaturedFocused = focusedScreen === 'hot-featured';

   


  // Create animated values for opacity and scale for each button
  const opacityValueHome = useRef(new Animated.Value(1)).current;
  const scaleValueHome = useRef(new Animated.Value(1)).current;

  const opacityValueProfile = useRef(new Animated.Value(1)).current;
  const scaleValueProfile = useRef(new Animated.Value(1)).current;

  const opacityValueHotFeatured = useRef(new Animated.Value(1)).current;
  const scaleValueHotFeatured = useRef(new Animated.Value(1)).current;

  const handlePressIn = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        activeOpacity={0.8}
        onPressIn={() => handlePressIn(scaleValueHome)}
        onPressOut={() => handlePressOut(scaleValueHome)}
        style={[
          styles.button,
          {
            opacity: opacityValueHome,
            transform: [{ scale: isHomeFocused ? scaleValueHome : 1 }],
          },
        ]}
      >
        <Icon name="home" size={isHomeFocused ? 40 : 25} color={isHomeFocused ? "#53a20e" :"black"} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        activeOpacity={0.8}
        onPressIn={() => handlePressIn(scaleValueProfile)}
        onPressOut={() => handlePressOut(scaleValueProfile)}
        style={[
          styles.button,
          {
            opacity: opacityValueProfile,
            transform: [{ scale: isProfileFocused ? scaleValueProfile : 1 }],
          },
        ]}
      >
        <Icon name="user" size={isProfileFocused ? 40 : 25} color={isProfileFocused ? "#53a20e":"black"} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('hot-featured')}
        activeOpacity={0.8}
        onPressIn={() => handlePressIn(scaleValueHotFeatured)}
        onPressOut={() => handlePressOut(scaleValueHotFeatured)}
        style={[
          styles.button,
          {
            opacity: opacityValueHotFeatured,
            transform: [
              { scale: isHotFeaturedFocused ? scaleValueHotFeatured : 1 },
            ],
          },
        ]}
      >
        <Icon name="free-code-camp" size={isHotFeaturedFocused ? 40 : 25} color={isHotFeaturedFocused ? "#53a20e" :'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
});

export default Footer;



