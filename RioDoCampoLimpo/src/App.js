import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Mapa from './pages/mapa';

export default class App extends Component {

  render() {
    return (
      <Mapa></Mapa>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});