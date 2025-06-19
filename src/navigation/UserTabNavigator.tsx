import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuStackNavigator from './UserMenuNavigator';
import UserOrderNavigator from './UserOrderNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/navigation';
import { useAuthContext } from '../providers/AuthProvider';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'User'>;

export type TabParamList = {
  MenuStack: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function UserTabNavigator() {
  // const navigation = useNavigation<NavigationProp>();
  // const { session } = useAuthContext();

  // useEffect(() => {
  //   if (!session) {
  //     navigation.navigate('SignIn');
  //   }
  // }, []);

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
