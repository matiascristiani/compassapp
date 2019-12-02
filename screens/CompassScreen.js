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
  headerStyle: {
        backgroundColor: '#393939',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold',
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393939',
  },
});
