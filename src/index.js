import React from 'react';
// import { Container } from './styles';

import AppContainer from './routes';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export default function App() {
  return <AppContainer />;
}
