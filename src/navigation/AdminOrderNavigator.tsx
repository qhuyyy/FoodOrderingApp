import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetailScreen from '../screens/admin/OrderDetailScreen';
import AdminOrderTopTabs from './AdminOrderTopTabs';
import { Order } from '../type/types';

export type AdminOrderStackParamList = {
  OrdersTopTabs: undefined;
  OrderDetail: { order: Order };
};

const Stack = createStackNavigator<AdminOrderStackParamList>();

export default function AdminOrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersTopTabs"
        component={AdminOrderTopTabs}
        // options={{ headerTitleAlign: 'center', title: 'Orders' }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          title: `Order: ${route.params.order.id}`,
        })}
      />
    </Stack.Navigator>
  );
}
