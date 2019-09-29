import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class Mapa extends Component {
  state = {
    position: null,
    loaded: false,
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({ position, loaded: true });
    });
  };

  componentDidMount() {
    this.findCoordinates();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.loaded ? JSON.stringify(this.state.position.coords) : 'espere'}
        </Text>
        <MapView
          style={styles.map}
          loadingEnabled={true}
          region={
            this.state.loaded == true
              ? {
                  latitude: this.state.position.coords.latitude,
                  longitude: this.state.position.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.0121,
                }
              : {}
          }></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
