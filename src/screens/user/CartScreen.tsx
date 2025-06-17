import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useCartContext } from '../../providers/CartProvider';
import CartListItem from '../../components/CartListItem';
import CustomButton from '../../components/CustomButton';

const CartScreen = () => {
  const { items, total } = useCartContext();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
      <Text style={{ padding: 10, fontWeight: '500', fontSize: 18 }}>
        Total price: ${total}
      </Text>
      <View style={{ padding: 10 }}>
        <CustomButton text="Checkout" />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
