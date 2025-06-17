import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuStackParamList } from '../navigation/MenuNavigator';
import { useCartContext } from '../providers/CartProvider';
import { PizzaSize } from '../type/types';

type ProductDetailRouteProp = RouteProp<MenuStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<MenuStackParamList>;

const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { product } = route.params;

  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('L');

  const { addItem } = useCartContext();
  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    navigation.navigate('Menu');
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: `${product.name}` });
  }, [navigation, product]);

  if (!product) {
    return <Text>Product was not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
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

      <Text style={styles.price}>${product.price}</Text>

      <View>
        <TouchableOpacity onPress={addToCart} style={styles.button}>
          <Text style={styles.text}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
