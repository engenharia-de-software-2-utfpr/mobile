import React from 'react';
import {TabBar} from 'react-native-animated-nav-tab-bar';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Occurrences from './Occurrences/routes';
import Events from './Events/routes';
import Informations from './Informations/routes';
import Surveys from './Surveys/routes';

export default createBottomTabNavigator(
  {
    Occurrences,
    Events,
    Informations,
    Surveys,
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
