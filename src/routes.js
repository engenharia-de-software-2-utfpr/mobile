import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Auth from './pages/Auth/routes';
import AuthLoading from './pages/AuthLoading';
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
