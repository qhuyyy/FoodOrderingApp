import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type/navigation';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

type RoleSelectorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RoleSelector'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<RoleSelectorNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        text="Sign Out"
        onPress={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error('Sign out error:', error.message);
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
});
