import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/MenuScreen';
import Screen2 from '../screens/Screen2';

export type TabParamList = {
  Menu: undefined;
  Screen2: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/Menu.png')}
              style={{
                width: 32,
                height: 32,
                tintColor: focused ? '#007AFF' : '#8E8E93',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/Order.png')}
              style={{
                width: 32,
                height: 32,
                tintColor: focused ? '#007AFF' : '#8E8E93',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
