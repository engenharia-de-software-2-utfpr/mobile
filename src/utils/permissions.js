import {request, PERMISSIONS} from 'react-native-permissions';

export async function requestStoragePermission() {
  return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
    title: 'Permissão necessária',
    message: 'Precisamos de sua permissão para salvar as fotos',
  });
  // return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
}
