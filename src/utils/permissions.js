import {request, PERMISSIONS} from 'react-native-permissions';

export async function requestStoragePermission() {
  return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
    title: 'Permissão necessária',
    message: 'Precisamos de sua permissão para salvar as fotos',
  });
  // return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
}

export async function requestGeoPermission() {
  return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
    title: 'Permissão necessária',
    message: 'Precisamos de sua permissão para mostrar as ocorrências próximas',
  });
  // return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
}
