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
import { Order, Tables } from '../type/types';

dayjs.extend(relativeTime);

type OrderListItemProps = TouchableOpacityProps & {
  order: Tables<'orders'>;
  bgColor?: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return '#519872';
    case 'Cooking':
      return '#ECF39E'; 
    case 'Delivering':
      return '#90BEDE';
    case 'Delivered':
      return '#BEC5AD';
  }
};

const OrderListItem = ({ order, ...rest }: OrderListItemProps) => {
  const bgColor = getStatusColor(order.status);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      {...rest}
    >
      <View>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.time}>{dayjs(order.updated_at).fromNow()}</Text>
      </View>

      <Text style={styles.status}>{order.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9B9B7',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'black',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;
