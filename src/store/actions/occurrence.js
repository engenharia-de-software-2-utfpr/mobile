import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';
import api from '../../services/api';
import Geolocation from '@react-native-community/geolocation';
import Sensitive from 'react-native-sensitive-info';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export function updateOccurrence(data) {
  return {
    type: 'UPDATE_OCCURRENCE',
    payload: {data},
  };
}

const mediaPath =
  'file://' + RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export function createOccurrence() {
  return async (dispatch, getState) => {
    dispatch(createOccurrenceStarted());

    try {
      const {occurrence} = getState();

      const token = await Sensitive.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      // Salva localmente independente da conexão
      let occurrences = JSON.parse(await AsyncStorage.getItem('@occurrences'));

      if (!occurrences) {
        occurrences = [];
      }

      occurrences.push({...occurrence, created: false, uploaded: false});
      AsyncStorage.setItem('@occurrences', JSON.stringify(occurrences));

      const {isConnected} = await NetInfo.fetch();

      if (isConnected) {
        Geolocation.getCurrentPosition(async position => {
          const {data} = await api.post(
            'occurrence',
            {
              coordinates: {
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
              },
              num_photos: occurrence.photos.length,
              num_videos: occurrence.videos.length,
              num_audios: occurrence.audios.length,
              category_id: occurrence.category,
              description: occurrence.description,
              criticity_level: occurrence.criticityLevel,
            },
            {
              headers: {Authorization: 'Bearer ' + token},
            },
          );

          const photoUploadPromises = occurrence.photos.map((name, index) => {
            const fileUri = (mediaPath + '/' + name).replace('file://', '');

            const headers = {};

            return RNFetchBlob.fetch(
              'PUT',
              data.data.photos[index],
              headers,
              RNFetchBlob.wrap(fileUri),
            );
          });

          // atualizar created = true
          // salvar urls para caso a internet caia no meio do processo de upload

          await Promise.all(photoUploadPromises);

          // atualizar uploaded = true

          dispatch(createOccurrenceSuccess());
        });
      }
    } catch (error) {
      dispatch(createOccurrenceFailure());
    }
  };
}

function createOccurrenceStarted(photo) {
  return {
    type: 'CREATE_OCCURRENCE_STARTED',
    payload: {},
  };
}

function createOccurrenceSuccess(photo) {
  return {
    type: 'CREATE_OCCURRENCE_SUCCESS',
    payload: {},
  };
}

function createOccurrenceFailure(error) {
  return {
    type: 'CREATE_OCCURRENCE_FAILURE',
    payload: {},
  };
}
