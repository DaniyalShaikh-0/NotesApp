import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
const CustomButton = ({color, title, onPress, style, fontSize, spacing}) => {
  // console.log(disabled);
  return (
    <TouchableOpacity
      // disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress ? onPress : () => alert('ALL DETAILS')}
      style={{
        borderColor: color || 'dodgerblue',
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        // width: "70%",
        alignSelf: 'center',
        borderRadius: 7,
        // height: 30,
        ...style,
      }}>
      <Text
        style={{
          color: color || 'dodgerblue',
          textAlign: 'center',
          fontSize: fontSize || 14,
          letterSpacing: 0 || spacing,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
