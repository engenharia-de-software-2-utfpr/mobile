import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';
import New from './New';

const Occurrences = createStackNavigator({Home, New}, {headerMode: 'none'});

Occurrences.navigationOptions = {
  tabBarLabel: 'Ocorrências',
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="map" />
  ),
};

export default Occurrences;
