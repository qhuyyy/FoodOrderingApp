import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import OrderListItem from '../../components/OrderListItem';
import OrderItemListItem from '../../components/OrderItemListItem';
import { OrderStatus, PizzaSize } from '../../type/types';
import {
  useDeleteOrder,
  useOrderDetail,
  useUpdateOrder,
} from '../../api/orders';
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

  const [currentStatus, setCurrentStatus] = useState<OrderStatus | string>('');
  const statuses: OrderStatus[] = ['New', 'Cooking', 'Delivering', 'Delivered'];

  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  const updateStatus = (status: OrderStatus) => {
    updateOrder({ id, status });
    setCurrentStatus(status);
  };

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
    if (order?.status) {
      setCurrentStatus(order.status);
    }
  }, [order?.status]);

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
      <Text>Status</Text>
      <View style={styles.statuses}>
        {statuses.map(status => (
          <Pressable
            key={status}
            style={[
              styles.status,
              currentStatus === status && styles.currentStatus,
            ]}
            onPress={() => updateStatus(status)}
          >
            <Text
              style={[
                styles.statusText,
                currentStatus === status && styles.currentStatusText,
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
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
    gap: 15,
    padding: 10,
  },
  statuses: {
    flexDirection: 'row',
    gap: 5,
  },
  status: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: '500',
    fontSize: 14,
  },
  currentStatus: {
    backgroundColor: '#96C9DC',
  },
  currentStatusText: {
    color: 'white',
  },
});
