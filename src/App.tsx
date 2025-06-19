import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectorScreen from './screens/RoleSelectorScreen';
import AdminTabNavigator from './navigation/AdminTabNavigator';
import UserTabNavigator from './navigation/UserTabNavigator';
import { RootStackParamList } from './type/navigation';
import { StatusBar } from 'react-native';
import SignInScreen from './screens/authentication/SignInScreen';
import SignUpScreen from './screens/authentication/SignUpScreen';
import CartProvider from './providers/CartProvider';
import AuthProvider from './providers/AuthProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />
            <Stack.Screen name="Admin" component={AdminTabNavigator} />
            <Stack.Screen name="User" component={UserTabNavigator} />
          </Stack.Navigator>
          <StatusBar barStyle={'dark-content'} />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
