import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { defaultImage } from '../../components/ProductListItem';
import { launchImageLibrary } from 'react-native-image-picker';
import { AdminMenuStackParamList } from '../../navigation/AdminMenuNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProductDetailRouteProp = RouteProp<
  AdminMenuStackParamList,
  'UpdateProduct'
>;
type NavigationProp = NativeStackNavigationProp<AdminMenuStackParamList>;

const UpdateProductScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [errors, setErrors] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(product.image);

  const resetFields = () => {
    setName('');
    setPrice('');
    setImageUri(null);
  };

  const validateInputs = () => {
    setErrors('');

    if (!name) {
      setErrors('Name is required!');
      return false;
    }
    if (!price) {
      setErrors('Price is required!');
      return false;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setErrors('Price must be a positive number!');
      return false;
    }

    return true;
  };

  const onUpdate = () => {
    if (!validateInputs()) return;

    console.log('Product updated:', {
      name,
      price,
      imageUri,
    });

    resetFields();
  };

  const onDelete = () => {
    console.log('Product deleted!');
  };

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
      },
    ]);
  };

  const requestPermissionAndPickImage = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Cannot access media library');
        return;
      }
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          const selected = response.assets[0];
          setImageUri(selected.uri || null);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri || defaultImage }} style={styles.image} />
      <TouchableOpacity
        onPress={requestPermissionAndPickImage}
        style={{ alignItems: 'center' }}
      >
        <Text style={[styles.text, { color: '#96C9DC' }]}>Select Image</Text>
      </TouchableOpacity>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Product name:</Text>
        <TextInput
          value={name}
          placeholder="Type in the pizza name"
          style={styles.textInput}
          onChangeText={setName}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Product price:</Text>
        <TextInput
          value={price}
          placeholder="Type in the pizza price"
          style={styles.textInput}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <Text style={{ color: 'red' }}>{errors}</Text>
      <CustomButton text="Update the Product" onPress={onUpdate} />

      <TouchableOpacity
        onPress={confirmDelete}
        style={{ alignSelf: 'center' }}
      >
        <Text style={[styles.text, { color: '#96C9DC' }]}>
          Delete the Product
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    gap: 15,
  },
  textInputContainer: {
    gap: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
