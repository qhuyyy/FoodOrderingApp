import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import MenuStackNavigator from './MenuNavigator';
import Screen2 from '../screens/Screen2';
import Icon from 'react-native-vector-icons/FontAwesome5';
export type TabParamList = {
  MenuStack: undefined;
  Screen2: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="MenuStack"
        component={MenuStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="cookie"
              size={24}
              color={focused ? '#007AFF' : '#8E8E93'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bars"
              size={24}
              color={focused ? '#007AFF' : '#8E8E93'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
