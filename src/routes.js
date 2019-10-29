import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthLoading from './pages/AuthLoading';;
import Auth from './pages/Auth/routes';
import Home from './pages/Home/routes';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      Home,
      Auth,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
