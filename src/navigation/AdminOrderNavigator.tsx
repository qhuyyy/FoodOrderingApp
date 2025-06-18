import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/admin/OrdersScreen';
import OrderDetailScreen from '../screens/admin/OrderDetailScreen.tsx';
import { Order } from '../type/types';

export type AdminOrderStackParamList = {
  Orders: undefined;
  OrderDetail: { order: Order }; 
};

const Stack = createStackNavigator<AdminOrderStackParamList>();

export default function AdminOrderNavigator() {
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
