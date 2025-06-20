import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import OrderListItem from '../../components/OrderListItem';
import OrderItemListItem from '../../components/OrderItemListItem';
import { OrderStatus, PizzaSize } from '../../type/types';
import { useDeleteOrder, useOrderDetail } from '../../api/orders';
import CustomButton from '../../components/CustomButton';

export type NavigationProp = NativeStackNavigationProp<
  UserOrderStackParamList,
  'OrderDetail'
>;

type ProductDetailRouteProp = RouteProp<UserOrderStackParamList, 'OrderDetail'>;

const OrderDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const id = route.params.order.id;
  
  const { data: order, error, isLoading } = useOrderDetail(id);
  const { mutate: deleteOrder } = useDeleteOrder();

  const onDelete = (id: number) => {
    if (order?.status !== 'New') {
      Alert.alert(
        'Not allowed',
        'Only orders with status "New" can be deleted.',
      );
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteOrder(id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  useEffect(() => {
    console.log(order);
  });

  useLayoutEffect(() => {
    if (order) {
      navigation.setOptions({ title: `Order #${order.id}` });
    }
  }, [navigation, order]);

  if (!order || error || isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => (
          <OrderItemListItem item={{ ...item, size: item.size as PizzaSize }} />
        )}
        contentContainerStyle={{ gap: 2 }}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.text}>Status:</Text>
        <Text style={styles.text}>{order.status}</Text>
      </View>

      {order.status === 'New' && (
        <CustomButton text="Delete Order" onPress={() => onDelete(order.id)} />
      )}
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
