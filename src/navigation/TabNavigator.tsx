import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/MenuScreen';
import Screen2 from '../screens/Screen2';

export type TabParamList = {
  Menu: undefined;
  Screen2: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Screen2" component={Screen2} />
    </Tab.Navigator>
  );
}
