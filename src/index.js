import React from 'react';
import {Provider} from 'react-redux';

import AppContainer from './routes';

import store from './store';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
