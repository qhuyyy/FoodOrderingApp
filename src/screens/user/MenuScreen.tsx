import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductListItem from '../../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserMenuStackParamList } from '../../navigation/UserMenuNavigator';
import { Product } from '../../type/types';
import { Text } from 'react-native-gesture-handler';
import { useProductList } from '../../api/products';

export type NavigationProp = NativeStackNavigationProp<
  UserMenuStackParamList,
  'Menu'
>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToDetail = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const { data: products, error, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch products</Text>;
  
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
