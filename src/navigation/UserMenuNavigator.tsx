import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/user/MenuScreen';
import ProductDetailScreen from '../screens/user/ProductDetailScreen';
import CartScreen from '../screens/user/CartScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Product } from '../type/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/navigation';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../providers/AuthProvider';

type NativeProp = NativeStackNavigationProp<RootStackParamList, 'User'>;

export type UserMenuStackParamList = {
  Menu: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const Stack = createStackNavigator<UserMenuStackParamList>();

export default function UserMenuNavigator() {
  // const navigation = useNavigation<NativeProp>();
  // const { isAdmin } = useAuthContext();

  // useEffect(() => {
  //   if (!isAdmin) {
  //     navigation.navigate('User');
  //   }
  // }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={({ navigation }) => ({
          title: 'User Menu',
          headerTitleAlign: 'center',
          presentation: 'modal',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{ marginEnd: 15 }}
            >
              <Icon name="shopping-cart" size={24} color="#007AFF" />
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
              <Icon name="shopping-cart" size={24} color="#007AFF" />
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
  );
}
