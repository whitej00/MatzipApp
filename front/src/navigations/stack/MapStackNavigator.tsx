import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import { authNavigations, mapNavigations } from '@/constants';
import SignupScreen from '@/screens/auth/SignupScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
}

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
    }}>
      <Stack.Screen 
        name={mapNavigations.MAP_HOME} 
        component={MapHomeScreen} 
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>  
  )
}

export default MapStackNavigator;