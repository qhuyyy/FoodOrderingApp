import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/navigation';
import { useAuthContext } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

type RoleSelectorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RoleSelector'
>;

export default function RoleSelectorScreen() {
  const navigation = useNavigation<RoleSelectorNavigationProp>();

  const { session, loading, isAdmin } = useAuthContext();
  console.log(session);

  if (loading) {
    return <ActivityIndicator />;
  }

  useEffect(() => {
    if (loading) return;

    if (!session) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
      return;
    }

    if (!isAdmin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'User' }],
      });
    }
  }, [loading, session, isAdmin]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your role</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Admin')}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('User')}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => supabase.auth.signOut()}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#57C4E5',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});
