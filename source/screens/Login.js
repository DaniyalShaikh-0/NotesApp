/**
 * Sample React Native Login
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
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/Button';
import IpAddress from '../data/IpAddress';
import CryptoJS from 'crypto-js';
import {useUser} from '../global/UserContext';
import socket from '../global/Socket';
const Login = ({navigation}) => {
  const [Credentials, setCredentials] = useState({email: '', password: ''});
  const [User, setUser] = useUser();
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  const HandleLogin = () => {
    // return navigation.navigate('DrawerScreen'); //! temporary
    let Creds = {...Credentials};
    // console.log(Creds);
    Creds.password = CryptoJS.SHA512(Creds.password).toString();
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      email: Creds.email.toLowerCase(),
      password: Creds.password,
      'Content-Type': 'application/json',
    };
    fetch(IpAddress + 'login', {
      method: 'GET',
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function ({data, response}) {
        if (!response) return;
        Alert.alert('Success', 'Welcome ' + data.name);
        setUser(data);
        socket.emit('Login', data.userid);
        navigation.navigate('DrawerScreen');
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
          title="Login"
          spacing={2}
          fontSize={20}
          onPress={HandleLogin}
        />
        <CustomButton
          title="Sign Up"
          spacing={2}
          fontSize={20}
          color="#644"
          onPress={() => navigation.navigate('Signup')}
        />
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

export default Login;
