import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome5';

import CartProvider from '../providers/CartProvider';
import { Product } from '../type/types';

import AdminProductDetailScreen from '../screens/admin/ProductDetailScreen';
import CreateProductScreen from '../screens/admin/CreateProductScreen';
import AdminMenuScreen from '../screens/admin/MenuScreen';
import AdminCartScreen from '../screens/admin/CartScreen';

export type AdminMenuStackParamList = {
  Menu: undefined;
  ProductDetail: { product: Product };
  CreateProduct: undefined;
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
                onPress={() => navigation.navigate('CreateProduct')}
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
          name="CreateProduct"
          component={CreateProductScreen}
          options={{ headerTitleAlign: 'center', title: 'Create new Product' }}
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
