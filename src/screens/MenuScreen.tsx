import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../assets/data/products';

import ProductListItem from '../components/ProductListItem';

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProductListItem product={products[1]} />
      <ProductListItem product={products[2]} />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {},
});
