import RNFS from 'react-native-fs';
import {v4} from 'uuid';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export function addPhoto(uri) {
  return async (dispatch, getState) => {
    const {occurrence} = getState();

    if (occurrence.photos.length >= 3) {
      dispatch(addPhotoFailure('Você pode tirar no máximo 3 fotos'));
    } else {
      const dest = `${mediaPath}/${v4()}.jpg`;

      try {
        // Copia foto para o armazenamento externo
        await RNFS.copyFile(uri, dest);
        dispatch(addPhotoSuccess(dest.split('/').pop()));
      } catch (error) {
        dispatch(addPhotoFailure(error.message));
      }
    }
  };
}

function addPhotoSuccess(photo) {
  return {
    type: 'ADD_PHOTO_SUCCESS',
    payload: {photo},
  };
}

function addPhotoFailure(error) {
  return {
    type: 'ADD_PHOTO_FAILURE',
    payload: {error},
  };
}

export function removePhoto(photo) {
  return {
    type: 'REMOVE_PHOTO',
    payload: {photo},
  };
}
