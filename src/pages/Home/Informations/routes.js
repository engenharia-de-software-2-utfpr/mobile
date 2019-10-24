import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';

const Informations = createStackNavigator({Home}, {headerMode: 'none'});

Informations.navigationOptions = {
  tabBarLabel: 'Informações',
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="school" />
  ),
};

export default Informations;
