import React, {useEffect, useState} from 'react';
import {Button, ButtonContainer, ButtonText, Container, Map} from './styles';
import {View, Image} from 'react-native';
import {requestGeoPermission} from '../../../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import {Circle, Marker} from 'react-native-maps';
import Sensitive from 'react-native-sensitive-info';
import icons from '../../../assets/icons';

import api from '../../../services/api';
import {useDispatch, useSelector} from 'react-redux';
import {updatePosition} from '../../../store/actions/position';

export default function Occurrence({navigation}) {
  const occurrence = useSelector(state => state.occurrence);
  const [occurrences, setOccurrences] = useState([]);

  const dispatch = useDispatch();

  async function getNearOccurrences({coords}) {
    console.tron.log('here');

    const token = await Sensitive.getItem('token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });

    api
      .get('occurrence/near', {
        params: {
          latitude: coords.latitude.toString(),
          longitude: coords.longitude.toString(),
        },
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(result => {
        console.log(result.data);
        setOccurrences(result.data.data);
      });
  }

  useEffect(() => {
    requestGeoPermission();

    Geolocation.watchPosition(position => {
      dispatch(updatePosition(position.coords));
    });

    Geolocation.getCurrentPosition(position => {
      dispatch(updatePosition(position.coords));
      getNearOccurrences(position);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Map
        region={{
          latitude: occurrence.latitude,
          longitude: occurrence.longitude,
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
          center={{
            latitude: occurrence.latitude,
            longitude: occurrence.longitude,
          }}
          radius={5}
          fillColor={'#4db6ac'}
          strokeColor={'#4db6ac'}
        />

        {occurrences.map(el => {
          return (
            <Marker
              key={el.id}
              coordinate={{
                latitude: parseFloat(el.latitude, 10),
                longitude: parseFloat(el.longitude, 10),
              }}>
              <Image
                source={icons[el.category_id]}
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
