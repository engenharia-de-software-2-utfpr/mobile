import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';

import Details from './New/Details';
import Photo from './New/Media/Photo';
import Video from './New/Media/Video';
import Audio from './New/Media/Audio';

const Media = createBottomTabNavigator({
  Photo: {
    screen: Photo,
    navigationOptions: {
      title: 'Fotos',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarIcon focused={focused} tintColor={tintColor} name="camera" />
      ),
    },
  },
  Video: {
    screen: Video,
    navigationOptions: {
      title: 'Vídeo',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarIcon focused={focused} tintColor={tintColor} name="videocam" />
      ),
    },
  },
  Audio: {
    screen: Audio,
    navigationOptions: {
      title: 'Áudio',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarIcon focused={focused} tintColor={tintColor} name="audiotrack" />
      ),
    },
  },
});

const Occurrences = createStackNavigator(
  {Home, Media, Details},
  {headerMode: 'none'},
);

Occurrences.navigationOptions = ({navigation}) => ({
  tabBarLabel: 'Ocorrências',
  tabBarVisible: navigation.state.index === 0,
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="map" />
  ),
});

export default Occurrences;
