import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import orders from '../../assets/data/orders';
import OrderListItem from '../../components/OrderListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { useNavigation } from '@react-navigation/native';
import { Order } from '../../type/types';

export type NavigationProp = NativeStackNavigationProp<
  UserOrderStackParamList,
  'Orders'
>;

const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToOrderDetail = (order: Order) => {
    navigation.navigate('OrderDetail', { order });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderListItem order={item} onPress={() => goToOrderDetail(item)} />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
