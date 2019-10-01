import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { requestApprovedOcurrences } from '../api/occurence';

import icons from '../../assets/icons';

export default class Mapa extends Component {
  state = {
    position: {
      coords: {
        // centro campo mourão
        latitude: -24.044106,
        longitude: -52.378633,
      },
    },
    approvedOccurrences: [],
  };

  getCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({ position, loaded: true });
    });
  };

  getNearApprovedOcurrences = async () => {
    const result = await requestApprovedOcurrences(this.state.position.coords);

    this.setState({
      approvedOccurrences: result.data,
    });
  };

  componentDidMount = () => {
    this.getCurrentPosition();
    this.getNearApprovedOcurrences();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.position.coords)}</Text>
        <MapView
          ref={'mapa'}
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude,
            longitude: this.state.position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0121,
          }}>
          {this.state.approvedOccurrences.map(occ => (
            <Marker
              key={`${occ.id}`}
              title={occ.category_id}
              coordinate={{
                latitude: occ.latitude,
                longitude: occ.longitude,
              }}>
              <Image style={styles.icon} source={icons[occ.category_id]} />
            </Marker>
          ))}
        </MapView>
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
  icon: { width: 25, height: 25 },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
