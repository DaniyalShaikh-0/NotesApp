/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './source/screens/Login';
import Signup from './source/screens/Signup';
import BottomTabScreen from './source/screens/BottomTabScreen';
import TopTabScreen from './source/screens/TopTabScreen';
import {UserInfoProvider} from './source/global/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerScreen from './source/screens/DrawerScreen';
import MtIcon from 'react-native-vector-icons/MaterialIcons';
const Stack = createNativeStackNavigator();
const App = () => {
  //const navigation = useNavigation();
  return (
    <UserInfoProvider>
      <StatusBar backgroundColor="#EE9644" animated barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Signup"
            component={Signup}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="BottomTabScreen"
            component={BottomTabScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="DrawerScreen"
            component={DrawerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfoProvider>
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

export default App;
