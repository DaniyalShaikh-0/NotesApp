/**
 * Sample React Native TextInput
 * propshttps://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/Button';
const TextInput = props => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 20}}>
        Email
      </Text>
      <Input
        placeholder="abc@gmail.com"
        leftIcon={<Icon name="code" size={24} color="black" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default TextInput;
props;
