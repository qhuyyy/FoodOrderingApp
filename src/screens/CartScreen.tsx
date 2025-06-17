import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useCartContext } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
  const { items } = useCartContext();
  console.log(items);
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
