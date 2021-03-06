import { Platform, Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import * as Permissions from 'expo-permissions';
import { Magnetometer } from 'expo-sensors';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import { ScreenOrientation } from 'expo';
import React, {Component} from 'react';

const {height, width} = Dimensions.get('window');
const STORAGE_KEY = 'points';

export default class Compass extends Component {


  /* Constructor */
  constructor() {
    super();
    this.state = {
      arrayPoints: [],

      showError: false,
      magnetometer: '0',
      
      lastLatitude: 0,
      lastLongitude: 0,

      presentLatitude: 0,
      presentLongitude: 0,

      timestamp: null
    };
  }

  componentWillMount() {


    /* Verify device  */
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        showError: true,
      });
    
    } else {
      // block orientation screen
      ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
      
      // get one location
      // this._getLocationAsync();
      
      // watch me location 5' and 1m.
      this._watchLocation();
      
     /* Get array of points, if exist */
     AsyncStorage.getItem(STORAGE_KEY).then(req => JSON.parse(req)).then(array => { 
        if (array && array.length > 0) {
           this.setState({
              arrayPoints: array,
            });
        }
      }).catch(error => {  console.log('@error-get') });
    }

  };

  componentDidMount() {
    this._toggle();
  };

  componentWillUnmount() {
    this._unsubscribe();
  };

  _watchLocation(){
    console.log("@_watchLocation");
    
    let { status } = Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    var _this=this;
    
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      distanceInterval: 10,
      timeInterval: 5000
    }, location => {
            console.log("Watch Location 5seg and mts");
            console.log(location);

            this.setState({ timestamp: location.timestamp });
            this.setState({ presentLatitude: location.coords.latitude });
            this.setState({ presentLongitude: location.coords.longitude });


              if (
                  this.state.lastLatitude != this.state.presentLatitude &&
                  this.state.lastLongitude != this.state.presentLongitude) {
                  this._savePosition()
              }
    });
  }

  _getLocationAsync = async () => {
    // Old functions localization.  
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    
    //Get location and logs
    let location = await Location.getCurrentPositionAsync({});
    
    console.log("Show me Location: ");
    console.log(location);

    this.setState({ timestamp: location.timestamp });
    this.setState({ presentLatitude: location.coords.latitude });
    this.setState({ presentLongitude: location.coords.longitude });
    
  };

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _subscribe = async () => {
    // Direction should be calculated by comparing current and last latitude and longitude.
    this._subscription = Magnetometer.addListener((data) => {
        this.setState({magnetometer: this._angle(data)});
    });
      
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  
  _savePosition = () => {
    // Save position on me array and set asyncStorage
    let arrayPoints = this.state.arrayPoints;

    let position = { 
      direction: this._direction(this.state.magnetometer),
      datetime: this.state.timestamp,
      lat:  this.state.presentLatitude,
      long: this.state.presentLongitude
    }

    console.log("save")
    console.log(arrayPoints);
    console.log(arrayPoints.length);

    if (arrayPoints && arrayPoints.length <=48) {
        //push item
        console.log('Push new item');
        arrayPoints.push(position);
    }else{
        console.log('max 50 items');
        // replace first position, order by datetime 
        let sortedPoints = arrayPoints.sort((a, b) => a.datetime - b.datetime)
        
        console.log('replace point');
        console.log(sortedPoints[0]);

        sortedPoints[0] = position;
        arrayPoints = sortedPoints;
    }

    // console.dir(arrayPoints);

    //set item
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arrayPoints)).then(data => {
        console.log('success!')
        this.setState({
              arrayPoints: arrayPoints,
        });
    }).catch(error => { console.log('error!') });

    //update positionLast
    this.setState({lastLatitude: this.state.presentLatitude });
    this.setState({lastLongitude: this.state.presentLongitude });

  };

  _angle = (magnetometer) => {
    if (magnetometer) {
      let {x, y, z} = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  _direction = (degree) => {
    // SET Direction letter: N, S, W, E, NE, NW, SE, SW.
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  render() {
    return (

      <Grid style={styles.gridContainer}>
        
        { this.state.showError ? (
          <Row size={5}>
            <Col>
              <Text style={styles.showError}>Imposible access to location was denied</Text>
            </Col>
          </Row>
        ) : null}
        
        <Row style={{alignItems: 'center'}} size={15}>
          <Col style={{alignItems: 'center'}}>
              <Text style={styles.coords}>{this.state.presentLatitude ? this.state.presentLatitude : ''}</Text>
          </Col>
          <Col style={{alignItems: 'center'}}>
            <Text style={styles.titleCompass}>{this._direction(this._degree(this.state.magnetometer))}
            </Text>
          </Col>
          <Col style={{alignItems: 'center'}}>
            <Text style={styles.coords}>{this.state.presentLongitude ? this.state.presentLongitude : ''}</Text>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={15}>
          <Col style={{alignItems: 'center'}}>
            <View style={{position: 'absolute', width: width, alignItems: 'center', top: 0}}>
              <Image source={require('../../../assets/images/compass/compass_pointer.png')} style={{
                height: height / 26,
                resizeMode: 'contain'
              }}/>
            </View>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={70}>
          <Text style={{
            color: '#fff',
            fontSize: height / 27,
            width: width,
            position: 'absolute',
            textAlign: 'center'
          }}>
            {this._degree(this.state.magnetometer)}°
          </Text>

          <Col style={{alignItems: 'center'}}>

            <Image source={require("../../../assets/images/compass/compass_bg.png")} style={{
              height: width - 80,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              transform: [{rotate: 360 - this.state.magnetometer + 'deg'}]
            }}/>

          </Col>
        </Row>

      </Grid>

    );
  };
}

const styles = StyleSheet.create({
  gridContainer: {
    height: window.height,
    backgroundColor: '#393939',
  },
  titleCompass: {
    color: '#fff',
    fontSize: height / 26,
    fontWeight: 'bold',
    padding: 20
  },
  showError: {
    backgroundColor: '#da0115',
    color: '#fff',
    fontWeight: 'bold',
    padding: 5
  },
  coords:  {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    borderColor: '#FFFFFF',
    color: '#fff',
    fontSize: 12,
    padding: 10
  }
});

