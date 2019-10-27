import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.focused ? props.tintColor : '#222222'}
    />
  );
}
