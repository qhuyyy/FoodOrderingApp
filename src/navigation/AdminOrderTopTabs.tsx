import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrdersScreen from '../screens/admin/OrdersScreen';
import ArchiveScreen from '../screens/admin/ArchiveScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
export type OrderTopTabParamList = {
  Active: undefined;
  Archive: undefined;
};

const Tab = createMaterialTopTabNavigator<OrderTopTabParamList>();

export default function AdminOrderTopTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#007AFF' },
          tabBarLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="Active" component={OrdersScreen} />
        <Tab.Screen name="Archive" component={ArchiveScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
