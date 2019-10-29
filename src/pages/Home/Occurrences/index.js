import React, {useEffect, useState} from 'react';
import {Button, ButtonContainer, ButtonText, Container, Map} from './styles';
import {View, Image} from 'react-native';
import {requestGeoPermission} from '../../../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import {Circle, Marker} from 'react-native-maps';
import Sensitive from 'react-native-sensitive-info';
import icons from '../../../assets/icons';

import api from '../../../services/api';

export default function Occurrence({navigation}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    async function getNearOccurrences() {
      const token = await Sensitive.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      api
        .get('occurrence/near', {
          params: {latitude, longitude},
          headers: {Authorization: 'Bearer ' + token},
        })
        .then(result => {
          setOccurrences(result.data.data);
        });
    }

    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      null,
      {enableHighAccuracy: true},
    );

    requestGeoPermission();
    getNearOccurrences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {occurrences.map(occurrence => {
          return (
            <Marker
              title={'ola'}
              key={occurrence.id}
              coordinate={{
                latitude: parseFloat(occurrence.latitude, 10),
                longitude: parseFloat(occurrence.longitude, 10),
              }}>
              <Image
                source={icons[occurrence.category_id]}
                style={{width: 20, height: 20}}
              />
            </Marker>
          );
        })}
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
