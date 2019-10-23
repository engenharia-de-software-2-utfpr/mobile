import React from 'react'

import { createAppContainer, createSwitchNavigator, } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/MaterialIcons';

import OccurrencesPage from './pages/Occurrences'
import NewOccurrencePage from './pages/Occurrences/New'

import EventsPage from './pages/Events'
import InformationsPage from "./pages/Informations";
import SurveysPage from "./pages/Surveys";


import LogInPage from './pages/Login'

import { TabBar } from "react-native-animated-nav-tab-bar";

const TabBarIcon = (props) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.focused ? props.tintColor : "#222222"}

    />
  )
}

const OccurrencesStack = createStackNavigator({ Home: OccurrencesPage, New: { screen: NewOccurrencePage, } }, { headerMode: "none" })
const EventsStack = createStackNavigator({ Home: EventsPage }, { headerMode: "none" })
const InformationsStack = createStackNavigator({ Home: InformationsPage }, { headerMode: "none" })
const SurveysStack = createStackNavigator({ Home: SurveysPage }, { headerMode: "none" })



OccurrencesStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Ocorrências",
  tabBarVisible: navigation.state.index === 0,
  tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="map" />,
})

EventsStack.navigationOptions = {
  tabBarLabel: "Eventos",
  tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="event" />,
}

InformationsStack.navigationOptions = {
  tabBarLabel: "Informações",
  tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="school" />,
}

SurveysStack.navigationOptions = {
  tabBarLabel: "Pesquisas",
  tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="search" />,
}



const HomeTabs = createBottomTabNavigator({ Occurrences: OccurrencesStack, Events: EventsStack, Informations: InformationsStack, Surveys: SurveysStack }, {
  tabBarOptions: {
    activeTintColor: "#2B7C85",
    inactiveTintColor: "#222222",
  },



  tabBarComponent: props => <TabBar
    {...props} tabBarBackground={'#efefef'} activeTabBackgrounds={'#4db6ac'}
  />,
})

const AuthStack = createStackNavigator({ LogIn: LogInPage }, { headerMode: "none" })

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: HomeTabs,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Home'
    }
  )
)
