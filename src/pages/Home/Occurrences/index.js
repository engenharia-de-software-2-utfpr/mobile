import React, {useEffect, useState} from 'react';
import {Button, ButtonContainer, ButtonText, Container, Map} from './styles';
import {View} from 'react-native';
import {requestGeoPermission} from '../../../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import {Circle} from 'react-native-maps';

export default function Occurrence({navigation}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    requestGeoPermission();

    Geolocation.getCurrentPosition(
      position => {
        console.log('hahahah', position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      null,
      {enableHighAccuracy: true},
    );
  }, []);

  return (
    <Container>
      <Map
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0,
          longitudeDelta: 0.003,
        }}
        customMapStyle={[
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
              ,
            ],
          },
          {
            featureType: 'landscape',
            stylers: [
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.business',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'water',
            stylers: [
              {
                weight: 8,
              },
            ],
          },
        ]}
        // onRegionChange={setRegion}
      >
        <Circle
          center={{latitude, longitude}}
          radius={5}
          fillColor={'#4db6ac'}
          strokeColor={'#4db6ac'}
        />
      </Map>

      <ButtonContainer>
        <Button
          onPress={() => {
            navigation.navigate('Media');
          }}>
          <ButtonText>Tem algo errado aqui!</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
