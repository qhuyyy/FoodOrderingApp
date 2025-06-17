import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import MenuStackNavigator from './AdminMenuNavigator';
import Screen2 from '../screens/admin/Screen2';
import Icon from 'react-native-vector-icons/FontAwesome5';
export type TabParamList = {
  MenuStack: undefined;
  Screen2: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFECEC',
        },
      }}
    >
      <Tab.Screen
        name="MenuStack"
        component={MenuStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <Icon name="cookie" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarLabel: 'Admin Panel',
          tabBarIcon: ({ color }) => (
            <Icon name="bars" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
