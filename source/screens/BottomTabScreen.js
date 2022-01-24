// import React, {useState, useEffect, useRef} from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Image,
//   Text,
//   useColorScheme,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import {FAB, Card, Avatar} from 'react-native-elements';
// import CustomButton from '../components/Button';
// import {useUser} from '../global/UserContext';
// import IpAddress from '../data/IpAddress';
// const {height, width} = Dimensions.get('window');

// export default function TabScreen() {
//   const [User, setUser] = useUser();
//   //   const [GivenTasks, setGivenTasks] = useState([]);
//   return (
//     <View>
//       <Text>ffg</Text>
//     </View>
//   );
// }
import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 50},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        // options={{headerShown: false}}
      />
      <Tab.Screen
        name="sHome"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="wsHome"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="swsHome"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
