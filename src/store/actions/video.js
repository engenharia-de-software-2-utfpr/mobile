import RNFS from 'react-native-fs';
import {v4} from 'uuid';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export function addVideo(uri) {
  return async (dispatch, getState) => {
    const {occurrence} = getState();

    if (occurrence.videos.length >= 1) {
      dispatch(addVideoFailure('Você pode gravar no máximo 1 vídeo'));
    } else {
      const fileName = v4() + '.mp4';

      const dest = `${mediaPath}/${fileName}`;

      console.tron.log(dest, uri);

      try {
        // Copia foto para o armazenamento externo
        await RNFS.copyFile(uri, dest);
        dispatch(addVideoSuccess(fileName));
      } catch (error) {
        dispatch(addVideoFailure(error.message));
      }
    }
  };
}

function addVideoSuccess(video) {
  return {
    type: 'ADD_VIDEO_SUCCESS',
    payload: {video},
  };
}

export function addVideoFailure(error) {
  return {
    type: 'ADD_VIDEO_FAILURE',
    payload: {error},
  };
}

export function removeVideo(video) {
  return {
    type: 'REMOVE_VIDEO',
    payload: {video},
  };
}
