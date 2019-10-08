import React, {Component} from 'react';
import {View, Image, PermissionsAndroid} from 'react-native';

import splash from '../Assets/splash.jpg';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
    };
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  componentDidMount = async () => {
    this.setState({userId: await AsyncStorage.getItem('uid')});
    let hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!hasLocationPermission) {
      hasLocationPermission = await this.requestLocationPermission();
    }
    if (hasLocationPermission) {
      const data = await this.performTimeConsumingTask();

      if (data !== null) {
        if (this.state.userId === null) {
          this.props.navigation.navigate('Login');
        } else {
          this.props.navigation.navigate('Home');
        }
      }
    }
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: `ChatWae needs permission to get your location.`,
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={splash} style={styles.splash} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    width: '100%',
    height: '100%',
  },
};

export default SplashScreen;
