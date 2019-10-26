import React from 'react';
import {Provider} from 'react-redux';
import RNFS from 'react-native-fs';

import AppContainer from './routes';

import store from './store';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

console.log({mediaPath});

RNFS.exists(mediaPath).then(exists => {
  if (!exists) {
    RNFS.mkdir(mediaPath, {});
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
