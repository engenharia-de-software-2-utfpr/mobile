import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {fromRight} from 'react-navigation-transitions';
import HeaderBack from '../../../components/HeaderBack';
import {TabBarIcon} from '../../../components/TabBarIcon';
import Home from './index';
import Details from './New/Details';
import Audio from './New/Media/Audio';
import Photo from './New/Media/Photo';
import Video from './New/Media/Video';
import Upload from './New/Upload';
import Advance from '../../../components/Advance';

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
  {
    Home: {screen: Home, navigationOptions: {header: null}},
    Media: {
      screen: Media,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBack navigation={navigation} />,
        headerRight: () => <Advance />,
      }),
    },
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Detalhes',
      },
    },
    Upload: {
      screen: Upload,
      navigationOptions: {header: null},
    },
  },
  {transitionConfig: () => fromRight()},
);

Occurrences.navigationOptions = ({navigation}) => ({
  tabBarLabel: 'Ocorrências',
  tabBarVisible: navigation.state.index === 0,
  tabBarIcon: ({focused, tintColor}) => (
    <TabBarIcon focused={focused} tintColor={tintColor} name="map" />
  ),
});

export default Occurrences;
