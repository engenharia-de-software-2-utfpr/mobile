import React from 'react';
import {TabBar} from 'react-native-animated-nav-tab-bar';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Occurrences from './Occurrences/routes';
import Events from './Events/routes';
import Informations from './Informations/routes';
import Settings from './Settings/routes';

export default createBottomTabNavigator(
  {
    Occurrences,
    Events,
    Informations,
    Settings,
  },
  {
    tabBarOptions: {
      activeTintColor: '#2B7C85',
      inactiveTintColor: '#222222',
    },

    tabBarComponent: props => (
      <TabBar
        {...props}
        tabBarBackground={'#efefef'}
        activeTabBackgrounds={'#4db6ac'}
      />
    ),
  },
);
