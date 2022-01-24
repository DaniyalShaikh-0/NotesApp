/**
 * Sample React Native Signup
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/Button';
import IpAddress from '../data/IpAddress';
import CryptoJS from 'crypto-js';
const Signup = ({navigation}) => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };
  const [Credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const HandleSignup = () => {
    let Creds = {...Credentials};
    // console.log(Creds);
    Creds.password = CryptoJS.SHA512(Creds.password).toString();
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'client',
      'Content-Type': 'application/json',
    };
    fetch(IpAddress + 'signup', {
      method: 'POST',
      body: JSON.stringify(Creds),
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };
  return (
    <View style={{...backgroundStyle, ...styles.sectionContainer}}>
      {/* <StatusBar barStyle="light-content" /> */}

      <Image
        source={require('../../assets/Notes.png')}
        style={{height: 150, width: 150, resizeMode: 'contain'}}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'space-evenly',
          flex: 1,
          // backgroundColor: 'blue',
        }}>
        <View style={{width: '100%'}}>
          <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 20}}>
            Full Name
          </Text>
          <Input
            value={Credentials.name}
            onChangeText={text => setCredentials({...Credentials, name: text})}
            placeholder="Tom Hanks"
            leftIcon={
              <TouchableOpacity>
                <Icon name="user" size={24} color="black" />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={{width: '100%'}}>
          <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 20}}>
            Email
          </Text>
          <Input
            value={Credentials.email}
            onChangeText={text => setCredentials({...Credentials, email: text})}
            placeholder="abc@gmail.com"
            leftIcon={<Icon name="code" size={24} color="black" />}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 20}}>
            Password
          </Text>
          <Input
            value={Credentials.password}
            onChangeText={text =>
              setCredentials({...Credentials, password: text})
            }
            placeholder="Enter you Password"
            rightIcon={
              <TouchableOpacity>
                <Icon name="eye-off" size={24} color="black" />
              </TouchableOpacity>
            }
            secureTextEntry
          />
        </View>

        <CustomButton
          title="Sign Up"
          spacing={2}
          fontSize={20}
          onPress={HandleSignup}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',
            flexDirection: 'row',
          }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{textDecorationLine: 'underline', color: 'dodgerblue'}}>
              login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default Signup;
