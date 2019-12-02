import { ScrollView, StyleSheet, View } from 'react-native';
import Home from '../modules/Home/containers/home';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393939',
  },
});
