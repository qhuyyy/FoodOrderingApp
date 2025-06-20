import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../../assets/data/products';
import ProductListItem from '../../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminMenuStackParamList } from '../../navigation/AdminMenuNavigator';
import { useProductList } from '../../api/products';

export type NavigationProp = NativeStackNavigationProp<
  AdminMenuStackParamList,
  'Menu'
>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToDetail = (product: any) => {
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
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
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
