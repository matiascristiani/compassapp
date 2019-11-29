import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Compass from '../modules/Compass/containers/compass';

export default function CompassScreen() {
  return (
    <View style={styles.container}>
      <Compass />
    </View>
  );
}

CompassScreen.navigationOptions = {
  title: 'Compass',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
