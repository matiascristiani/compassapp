import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.welcomeContainer}>
          
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.welcomeImage}
          />

          <TouchableOpacity>
            <Text style={styles.getStartedText}>Welcome to me CompassApp!</Text>
          </TouchableOpacity>

          <MonoText>Cristiani Matias Ezequiel</MonoText>

          <Text onPress={this.handleLinkPress} style={styles.linkText}> https://github.com/matiascristiani/compassapp </Text>

        </View>
        
      
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLinkPress() {
  WebBrowser.openBrowserAsync(
    'https://github.com/matiascristiani/compassapp/'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  welcomeImage: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
    marginTop: 60
  },
  
  getStartedText: {
    fontSize: 25,
    marginTop: 15,
    marginTop: 5
  },

  linkText: {
    fontSize: 14,
    backgroundColor: '#dadada',
    color: '#393939',
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
  }
});
