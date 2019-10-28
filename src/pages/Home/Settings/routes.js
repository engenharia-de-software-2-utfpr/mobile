import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';

const Settings = createStackNavigator({Home}, {headerMode: 'none'});

Settings.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="settings" />
  ),
};

export default Settings;
