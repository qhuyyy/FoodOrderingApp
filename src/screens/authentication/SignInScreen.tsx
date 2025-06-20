import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type/navigation';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    } else {
      navigation.navigate('RoleSelector');
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          value={email}
          placeholder="Enter your Email"
          style={styles.textInput}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          value={password}
          placeholder="Enter your password"
          style={styles.textInput}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <CustomButton
        disabled={loading}
        text={loading ? 'Signing In ...' : 'Sign In'}
        onPress={() => signInWithEmail()}
      />

      <View style={styles.signInContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 20,
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
  signInContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signUpText: {
    color: '#57C4E5',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
  },
});
