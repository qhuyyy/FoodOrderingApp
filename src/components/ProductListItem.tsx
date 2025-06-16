import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ProductListItem = ({ product }: any ) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} $</Text>
    </View>
  );
};

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
  },
  price: {
    color: '#077187',
    fontWeight: '600',
    fontSize: 16,
  },
});
