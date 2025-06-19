import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuStackNavigator from './AdminMenuNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AdminOrderNavigator from './AdminOrderNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/navigation';
import { useAuthContext } from '../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

export type TabParamList = {
  MenuStack: undefined;
  OrdersStack: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AdminTabNavigator() {
  const navigation = useNavigation<NavigationProp>();
  const { isAdmin } = useAuthContext();

  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate('User');
    }
  }, [isAdmin]);

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
        name="OrdersStack"
        component={AdminOrderNavigator}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <Icon name="bars" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
