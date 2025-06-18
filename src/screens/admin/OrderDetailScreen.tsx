import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import OrderListItem from '../../components/OrderListItem';
import OrderItemListItem from '../../components/OrderItemListItem';
import { OrderStatus } from '../../type/types';
export type NavigationProp = NativeStackNavigationProp<
  UserOrderStackParamList,
  'OrderDetail'
>;
type ProductDetailRouteProp = RouteProp<UserOrderStackParamList, 'OrderDetail'>;

const OrderDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const { order } = route.params;

  const [currentStatus, setCurrentStatus] = useState(order.status);

  const statuses: OrderStatus[] = ['New', 'Cooking', 'Delivering', 'Delivered'];

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Order #${order.id}` });
  }, [navigation, order]);

  return (
    <View style={styles.container}>
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 2 }}
      />
      <Text>Status</Text>
      <View style={styles.statuses}>
        {statuses.map(size => (
          <Pressable
            key={size}
            style={[
              styles.status,
              currentStatus === size && styles.currentStatus,
            ]}
            onPress={() => setCurrentStatus(size)}
          >
            <Text
              style={[
                styles.statusText,
                currentStatus === size && styles.currentStatusText,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    gap: 10,
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
