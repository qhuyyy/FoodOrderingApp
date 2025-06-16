import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MenuScreen from '../screens/MenuScreen';
import Screen2 from '../screens/Screen2';

export type TabParamList = {
  Menu: undefined;
  Screen2: undefined;
};

export const BottomTab = createBottomTabNavigator<TabParamList>();

export function TabNavigator({}) {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        // options={{
        //   tabBarIcon: () => (
        //     <Image
        //       source={require('../assets/images/camera.png')}
        //       style={{width: 24, height: 24}}
        //       resizeMode="contain"
        //     />
        //   ),
        // }}
      />
      <BottomTab.Screen
        name="Screen2"
        component={Screen2}
        // options={{
        //   tabBarIcon: () => (
        //     <Image
        //       source={require('../assets/images/map.png')}
        //       style={{width: 24, height: 24}}
        //       resizeMode="contain"
        //     />
        //   ),
        // }}
      />
    </BottomTab.Navigator>
  );
}
