import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Order } from '../type/types';

dayjs.extend(relativeTime);

type OrderListItemProps = TouchableOpacityProps & {
  order: Order;
};

const OrderListItem = ({ order, ...rest }: OrderListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
      </View>

      <Text style={styles.status}>{order.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;
