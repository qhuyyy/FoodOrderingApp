import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/user/OrdersScreen';
import OrderDetailScreen from '../screens/user/OrderDetailScreen';
import { Order } from '../type/types';

export type UserOrderStackParamList = {
  Orders: undefined;
  OrderDetail: { order: Order }; 
};

const Stack = createStackNavigator<UserOrderStackParamList>();

export default function UserOrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerTitleAlign: 'center', title: 'Orders' }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ headerTitleAlign: 'center', title: 'Order Detail' }}
      />
    </Stack.Navigator>
  );
}
