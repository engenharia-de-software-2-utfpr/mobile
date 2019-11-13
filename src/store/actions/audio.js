import RNFS from 'react-native-fs';
import {v4} from 'uuid';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export function addAudio(uri) {
  return async (dispatch, getState) => {
    const {occurrence} = getState();

    if (occurrence.audios.length >= 1) {
      dispatch(addAudioFailure('Você pode gravar no máximo 1 áudio'));
    } else {
      const fileName = v4() + '.aac';

      const dest = `${mediaPath}/${fileName}`;
      try {
        // Copia foto para o armazenamento externo
        await RNFS.copyFile(uri, dest);
        dispatch(addAudioSuccess(fileName));
      } catch (error) {
        dispatch(addAudioFailure(error.message));
      }
    }
  };
}

function addAudioSuccess(audio) {
  return {
    type: 'ADD_AUDIO_SUCCESS',
    payload: {audio},
  };
}

export function addAudioFailure(error) {
  return {
    type: 'ADD_AUDIO_FAILURE',
    payload: {error},
  };
}

export function removeAudio(audio) {
  return {
    type: 'REMOVE_AUDIO',
    payload: {audio},
  };
}
