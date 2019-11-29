import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CompassScreen from '../screens/CompassScreen';
import ListScreen from '../screens/ListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} 
    />
  ),
};

HomeStack.path = '';

const CompassStack = createStackNavigator(
  {
    Compass: CompassScreen,
  },
  config
);

CompassStack.navigationOptions = {
  tabBarLabel: 'Compass',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'} />
  ),
};

CompassStack.path = '';

const ListStack = createStackNavigator(
  {
    List: ListScreen,
  },
  config
);

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

ListStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CompassStack,
  ListStack,
});

tabNavigator.path = '';

export default tabNavigator;
