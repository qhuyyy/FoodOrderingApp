import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

type CustomButtonProps = TouchableOpacityProps & {
  text: string;
};

const CustomButton = ({ text, ...rest }: CustomButtonProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} {...rest}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#57C4E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
});
