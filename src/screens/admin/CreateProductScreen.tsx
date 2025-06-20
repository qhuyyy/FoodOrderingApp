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
import { useInsertProduct } from '../../api/products';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminMenuStackParamList } from '../../navigation/AdminMenuNavigator';

const CreateProductScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminMenuStackParamList>>();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const { mutate: insertProduct } = useInsertProduct();

  const resetFields = () => {
    setName('');
    setPrice('');
    setImage(null);
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

  const onCreate = () => {
    if (!validateInputs()) return;

    console.log('Product created:', {
      name,
      price,
      image,
    });

    insertProduct(
      { name, image, price: parseFloat(price) },
      {
        onSuccess: () => {
          navigation.navigate('Menu'), resetFields();
        },
      },
    );

    resetFields();
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
          setImage(selected.uri || null);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image || defaultImage }} style={styles.image} />

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

      <CustomButton text="Add new product" onPress={onCreate} />
    </View>
  );
};

export default CreateProductScreen;

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
