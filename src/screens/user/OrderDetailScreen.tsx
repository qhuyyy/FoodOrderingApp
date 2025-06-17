import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserOrderStackParamList } from '../../navigation/UserOrderNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import OrderListItem from '../../components/OrderListItem';
import OrderItemListItem from '../../components/OrderItemListItem';

export type NavigationProp = NativeStackNavigationProp<
  UserOrderStackParamList,
  'OrderDetail'
>;
type ProductDetailRouteProp = RouteProp<UserOrderStackParamList, 'OrderDetail'>;

const OrderDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const { order } = route.params;

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
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
