import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import RNFS from 'react-native-fs';
import Sensitive from 'react-native-sensitive-info';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/api';

export function updateOccurrence(data) {
  return {
    type: 'UPDATE_OCCURRENCE',
    payload: { data },
  };
}

const mediaPath =
  'file://' + RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export function syncOccurrences() {
  return async (dispatch, getState) => {
    let occurrences = JSON.parse(await AsyncStorage.getItem('@occurrences'));

    const token = await Sensitive.getItem('token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });

    // while (occurrences.length > 0) {
    //   const occurrence = occurrences[0];

    //   try {
    //     const {data} = await api.post(
    //       'occurrence',
    //       {
    //         coordinates: {
    //           latitude: occurrence.latitude.toString(),
    //           longitude: occurrence.longitude.toString(),
    //         },
    //         num_photos: occurrence.photos.length,
    //         num_videos: occurrence.videos.length,
    //         num_audios: occurrence.audios.length,
    //         category_id: occurrence.category,
    //         description: occurrence.description,
    //         criticity_level: occurrence.criticityLevel,
    //       },
    //       {
    //         headers: {Authorization: 'Bearer ' + token},
    //       },
    //     );

    //     const photoUploadPromises = occurrence.photos.map((name, index) => {
    //       const fileUri = (mediaPath + '/' + name).replace('file://', '');

    //       const headers = {};

    //       // return RNFetchBlob.fetch(
    //       //   'PUT',
    //       //   data.data.photos[index],
    //       //   headers,
    //       //   RNFetchBlob.wrap(fileUri),
    //       // );
    //     });

    //     await Promise.all(photoUploadPromises);
    //     occurrences.remove

    //   } catch (error) {}
    // }
  };
}

export function createOccurrence() {
  return async (dispatch, getState) => {
    dispatch(createOccurrenceStarted());

    try {
      const { occurrence } = getState();

      if (!occurrence.photos.length && !occurrence.videos.length) {
        throw 'Você deve enviar pelo menos uma foto ou um video';
      }

      const token = await Sensitive.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      const { isConnected } = await NetInfo.fetch();

      if (isConnected) {
        const { data } = await api.post(
          'occurrence',
          {
            coordinates: {
              latitude: occurrence.latitude.toString(),
              longitude: occurrence.longitude.toString(),
            },
            num_photos: occurrence.photos.length,
            num_videos: occurrence.videos.length,
            num_audios: occurrence.audios.length,
            category_id: occurrence.category,
            description: occurrence.description,
            criticity_level: occurrence.criticityLevel,
          },
          {
            headers: { Authorization: 'Bearer ' + token },
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

        await Promise.all(photoUploadPromises);

        const videoUploadPromises = occurrence.videos.map((name, index) => {
          const fileUri = (mediaPath + '/' + name).replace('file://', '');

          const headers = {};

          return RNFetchBlob.fetch(
            'PUT',
            data.data.videos[index],
            headers,
            RNFetchBlob.wrap(fileUri),
          );
        });

        await Promise.all(videoUploadPromises);

        const audioUploadPromises = occurrence.audios.map((name, index) => {
          const fileUri = (mediaPath + '/' + name).replace('file://', '');

          const headers = {};

          return RNFetchBlob.fetch(
            'PUT',
            data.data.audios[index],
            headers,
            RNFetchBlob.wrap(fileUri),
          );
        });

        await Promise.all(audioUploadPromises);

        dispatch(createOccurrenceSuccess());
        dispatch(clearOccurrence());
      } else {
        // Salva localmente
        let occurrences = JSON.parse(
          await AsyncStorage.getItem('@occurrences'),
        );

        if (!occurrences) {
          occurrences = [];
        }

        occurrences.push({ ...occurrence, created: false, uploaded: false });

        console.tron.log(occurrences);

        AsyncStorage.setItem('@occurrences', JSON.stringify(occurrences));
      }
    } catch (error) {
      dispatch(createOccurrenceFailure(error));
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

export function clearOccurrence() {
  return {
    type: 'CLEAR_OCCURRENCE',
  };
}
