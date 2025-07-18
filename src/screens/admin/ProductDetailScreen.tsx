import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminMenuStackParamList } from '../../navigation/AdminMenuNavigator';
import { PizzaSize } from '../../type/types';
import { useProduct } from '../../api/products';
import RemoteImage from '../../components/RemoteImage';
import { defaultImage } from '../../components/ProductListItem';

type ProductDetailRouteProp = RouteProp<
  AdminMenuStackParamList,
  'ProductDetail'
>;
type NavigationProp = NativeStackNavigationProp<AdminMenuStackParamList>;

const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const {
    data: product,
    error,
    isLoading,
  } = useProduct(route.params.product.id);

  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState('');

  useLayoutEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.name ?? '' });
    }
  }, [navigation, product]);

  if (!product) {
    return <ActivityIndicator />;
  }
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <RemoteImage
        path={product.image}
        fallback={defaultImage}
        style={styles.image}
      />

      <Text>Select size: </Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable
            key={size}
            style={[styles.size, selectedSize === size && styles.selectedSize]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price: ${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
  },
  sizes: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 18,
  },
  selectedSize: {
    backgroundColor: '#BCB8B1',
  },
  selectedSizeText: {
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  button: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#57C4E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
