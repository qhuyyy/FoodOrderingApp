import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { Image, TouchableOpacity } from 'react-native';
import { Product } from '../type/types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartProvider from '../providers/CartProvider';

export type MenuStackParamList = {
  Menu: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const Stack = createStackNavigator<MenuStackParamList>();

export default function MenuStackNavigator() {
  return (
    <CartProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ marginEnd: 15 }}
              >
                <Icon name="shopping-cart" size={24} color="6E7E85" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation, route }) => ({
            title: route.params.product.name,
            headerTitleAlign: 'center',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ marginEnd: 15 }}
              >
                <Icon name="shopping-cart" size={24} color="6E7E85" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
}
