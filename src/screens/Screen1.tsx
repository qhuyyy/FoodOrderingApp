import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen1 = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
        
      <Text>Screen1</Text>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
