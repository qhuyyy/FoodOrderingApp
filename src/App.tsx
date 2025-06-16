import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <TabNavigator />
    </NavigationContainer>
  );
}
