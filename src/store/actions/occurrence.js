import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';
import api from '../../services/api';

export function updateOccurrence(data) {
  return {
    type: 'UPDATE_OCCURRENCE',
    payload: {data},
  };
}

export function createOccurrence() {
  return async (dispatch, getState) => {
    dispatch(createOccurrenceStarted());

    try {
      const {occurrence} = getState();

      // Salva localmente independente da conexão
      let occurrences = JSON.parse(await AsyncStorage.getItem('@occurrences'));

      if (!occurrences) {
        occurrences = [];
      }

      occurrences.push({...occurrence, created: false, uploaded: false});
      AsyncStorage.setItem('@occurrences', JSON.stringify(occurrences));

      const {isConnected} = await NetInfo.fetch();

      if (isConnected) {
        const {data} = await api.post('occurrence', {
          coordinates: {latitude: '-48.0389848', longitude: '-52.3754754'},
          num_photos: occurrence.photos.length,
          num_videos: occurrence.videos.length,
          num_audios: occurrence.audios.length,
          category_id: occurrence.category,
          description: occurrence.description,
          criticity_level: occurrence.criticityLevel,
        });

        console.tron.log(data);
      } else {
        //
      }
    } catch (error) {
      console.tron.error(error);
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
