import {request, PERMISSIONS} from 'react-native-permissions';

export async function requestStoragePermission() {
  await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
}
