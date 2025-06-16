import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { Image, TouchableOpacity } from 'react-native';
import { Product } from '../type/types';

export type MenuStackParamList = {
  Menu: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<MenuStackParamList>();

export default function MenuStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={({ navigation }) => ({
          title: 'Menu',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Image
                source={require('../assets/icons/Cart.png')}
                style={{ width: 24, height: 24, marginRight: 16 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.product.name,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}
