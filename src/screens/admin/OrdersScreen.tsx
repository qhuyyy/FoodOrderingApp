import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import orders from '../../assets/data/orders';
import OrderListItem from '../../components/OrderListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { useNavigation } from '@react-navigation/native';
import { Order } from '../../type/types';
import { useAdminOrderList } from '../../api/orders';
import { supabase } from '../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubcription } from '../../api/orders/subcriptions';

export type NavigationProp = NativeStackNavigationProp<
  UserOrderStackParamList,
  'Orders'
>;

const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToOrderDetail = (order: Order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubcription();


  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch Orders</Text>;
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderListItem
            order={item as Order}
            onPress={() => goToOrderDetail(item as Order)}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
