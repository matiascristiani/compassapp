import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import List from '../modules/List/containers/list';

export default function ListScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <List />;
}

ListScreen.navigationOptions = {
  title: 'Ultimas localizaciones',
};
