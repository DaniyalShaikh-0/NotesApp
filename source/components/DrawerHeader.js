import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MtIcon from 'react-native-vector-icons/MaterialIcons';

export default function HeaderDrawer({navigation}) {
  return (
    <View
      style={{
        backgroundColor: '#EE9644',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        justifyContent: 'space-between',
        // height: StatusBar.currentHeight,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          width: 150,
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'blue',
        }}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          activeOpacity={0.3}>
          <Icon name="menu-outline" size={34} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'sans-serif-medium',
            fontWeight: '600',
            color: 'black',

            fontSize: 24,
          }}>
          NotesApp
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 10,
          width: 80,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
          // backgroundColor: 'blue',
          // alignSelf: 'center',
          // height: StatusBar.currentHeight,
        }}>
        <Icon name="ios-search-sharp" size={24} color="black" />
        {/* <Icon name="ios-search-sharp" size={24} /> */}
        <MtIcon name="more-vert" size={24} color="black" />
      </View>
    </View>
  );
}
