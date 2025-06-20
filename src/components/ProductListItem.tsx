import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Product, Tables } from '../type/types';
import RemoteImage from './RemoteImage';

export const defaultImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
  onPress: () => void;
};

const ProductListItem = ({ product, onPress }: ProductListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RemoteImage
        path={product.image}
        fallback={defaultImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} $</Text>
    </TouchableOpacity>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
    alignItems: 'center',
    justifyContent: 'center',
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
