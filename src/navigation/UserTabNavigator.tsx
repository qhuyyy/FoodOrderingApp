import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuStackNavigator from './UserMenuNavigator';
import UserOrderNavigator from './UserOrderNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5';

export type TabParamList = {
  MenuStack: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function UserTabNavigator() {
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
        name="Orders"
        component={UserOrderNavigator} 
        options={{
          title: 'Orders',
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