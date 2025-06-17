import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../assets/data/products';
import ProductListItem from '../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuStackParamList } from '../navigation/MenuNavigator';

export type NavigationProp = NativeStackNavigationProp<
  MenuStackParamList,
  'Menu'
>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToDetail = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductListItem product={item} onPress={() => goToDetail(item)} />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
