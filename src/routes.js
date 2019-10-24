import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Auth from './pages/Auth/routes';
import Home from './pages/Home/routes';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home,
      Auth,
    },
    {
      initialRouteName: 'Home',
    },
  ),
);
