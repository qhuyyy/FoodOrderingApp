// navigation/AdminMenuNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminMenuScreen from '../screens/admin/MenuScreen';
import AdminProductDetailScreen from '../screens/admin/ProductDetailScreen';
import AdminCartScreen from '../screens/admin/CartScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartProvider from '../providers/CartProvider';
import { Product } from '../type/types';

export type AdminMenuStackParamList = {
  Menu: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const Stack = createStackNavigator<AdminMenuStackParamList>();

export default function AdminMenuNavigator() {
  return (
    <CartProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={AdminMenuScreen}
          options={({ navigation }) => ({
            title: 'Admin Menu',
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                // onPress={() => navigation.navigate('Cart')}
                style={{ marginEnd: 15 }}
              >
                <Icon name="plus-square" size={24} color="#FF3B30" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={AdminProductDetailScreen}
          options={({ navigation, route }) => ({
            title: route.params.product.name,
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ marginEnd: 15 }}
              >
                <Icon name="pen" size={20} color="#FF3B30" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Cart"
          component={AdminCartScreen}
          options={{ headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
}
