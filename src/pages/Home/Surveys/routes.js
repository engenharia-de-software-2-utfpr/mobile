import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';

const Surveys = createStackNavigator({Home}, {headerMode: 'none'});

Surveys.navigationOptions = {
  tabBarLabel: 'Pesquisas',
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="search" />
  ),
};

export default Surveys;
