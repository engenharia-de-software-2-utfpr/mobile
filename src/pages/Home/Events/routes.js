import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';

const Events = createStackNavigator({Home}, {headerMode: 'none'});

Events.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="event" />
  ),
};

export default Events;
