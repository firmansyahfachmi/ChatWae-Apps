import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import geolocation from 'react-native-geolocation-service';

import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      region: {
        latitude: -7.7571476,
        longitude: 110.3726004,
        latitudeDelta: 0.0221,
        longitudeDelta: 0.0221,
      },
    };
  }

  componentWillUnmount() {
    geolocation.stopObserving();
  }

  componentDidMount = async () => {
    this.setState({userId: await AsyncStorage.getItem('uid')});
    let hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!hasLocationPermission) {
      hasLocationPermission = await this.requestLocationPermission();
    }
    // if (hasLocationPermission) {
    //   geolocation.watchPosition(
    //     async position => {
    //       let Position = {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       };
    //       await firebase
    //         .firestore()
    //         .collection('users')
    //         .doc(this.state.userId)
    //         .update({Position})
    //         .then(() => {
    //           this.setState({
    //             region: {
    //               ...this.state.region,
    //               latitude: position.coords.latitude,
    //               longitude: position.coords.longitude,
    //             },
    //           });
    //         });
    //     },
    //     err => {
    //       console.log(err.code, err.message);
    //     },
    //     {
    //       showLocationDialog: true,
    //       distanceFilter: 1,
    //       enableHighAccuracy: true,
    //       fastestInterval: 5000,
    //       timeout: 15000,
    //       maximumAge: 10000,
    //     },
    //   );
    // }
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
      <Fragment>
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.region}
            showsUserLocation={true}
            followUserLocation={true}
            zoomControlEnabled={true}
            showsCompass={true}
            minZoomLevel={0}
            maxZoomLevel={20}
            style={styles.map}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
});

export default withNavigation(Maps);
