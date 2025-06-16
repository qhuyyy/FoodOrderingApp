import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../assets/data/products';

import ProductListItem from '../components/ProductListItem';

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductListItem product={item} />;
        }}
        numColumns={2}
      ></FlatList>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {},
});
