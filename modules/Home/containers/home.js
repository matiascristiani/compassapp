import { Image, ScrollView, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { MonoText } from '../../../components/StyledText';
import * as WebBrowser from 'expo-web-browser';
import { AsyncStorage } from 'react-native';
import React from 'react';

export default function Home() {
  return (

    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.welcomeContainer}>
          
          <Image
            source={require('../../../assets/images/icon.png')}
            style={styles.welcomeImage}
          />

          <TouchableOpacity>
            <Text style={styles.getStartedText}>Welcome to me CompassApp!</Text>
          </TouchableOpacity>

          <MonoText>Cristiani Matias Ezequiel</MonoText>

          <Text 
          onPress={() => WebBrowser.openBrowserAsync('https://github.com/matiascristiani/compassapp/')}
          style={styles.linkText}> https://github.com/matiascristiani/compassapp </Text>

        </View>
        
        <View style={styles.instrContainer}>
          
          <TouchableOpacity>
            <Text style={styles.instrText}>Instructions:</Text>
          </TouchableOpacity>

          <MonoText>Where Am I Going</MonoText>

          <Text 
            onPress={() =>  WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1qzJ07B59byG2g18kydN6CTc3nM2HEm_QZNnWCsJTGZk/edit?usp=sharing')}
            style={styles.instrDescription}>View requeriments for project ? , click me! </Text>

        </View>
        
      
      </ScrollView>
    </View>
  );
}


/* StyleSheet */
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
  },
  instrContainer: {
    paddingTop: 30,
    width: "80%",
    alignItems: 'flex-start',
  },
  instrText: {
    fontSize: 20,
    alignContent: 'flex-start'
  },
  instrDescription: {
    paddingTop: 10,
    color: 'blue'
  }
});
