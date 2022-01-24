import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Header from '../components/DrawerHeader';
import TopTabScreen from './TopTabScreen';
import Home from './Home';
import socket from '../global/Socket';
import {useUser} from '../global/UserContext';
const Drawer = createDrawerNavigator();

export default function DrawerScreen({navigation}) {
  const [Userr, setUserr] = useUser();
  function MyTasks({navigation}) {}

  function GivenTasks({navigation}) {
    return (
      <View style={{flex: 1}}>
        <Text>Article Screen</Text>
      </View>
    );
  }

  function About({navigation}) {
    return (
      <View style={{flex: 1}}>
        <Text>About Screen</Text>
      </View>
    );
  }

  return (
    <Drawer.Navigator screenOptions={{swipeEnabled: false}}>
      <Drawer.Screen
        options={{
          header: props => <Header {...props} />,
        }}
        name="My Tasks"
        component={TopTabScreen}
      />
      <Drawer.Screen
        options={{
          header: props => <Header {...props} />,
        }}
        name="Tasks Given By Me"
        component={Home}
      />
      <Drawer.Screen
        options={{
          header: props => <Header {...props} />,
        }}
        name="About"
        component={About}
      />
    </Drawer.Navigator>
  );
}
