import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {withNavigation} from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';

import Mark from '../Assets/MarkerWhite.png';

class Maps extends Component {
  constructor() {
    super();

    this.state = {
      region: null,
      longitude: 0,
      latitude: 0,
      userId: '',
      users: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.usersLocation();
    this.setState({userId: await AsyncStorage.getItem('uid')});
    Geolocation.getCurrentPosition(
      position => {
        let Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0071,
          longitudeDelta: 0.0071,
        };
        firebase
          .database()
          .ref('users/' + this.state.userId)
          .update({Location})
          .then(() => {
            this.setState({isLoading: false});
          });
        this.changeRegion(Location, Location.latitude, Location.longitude);
      },
      error => {
        console.warn(error.code, error.message);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        distanceFilter: 1,
        fastestInterval: 5000,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  usersLocation = () => {
    firebase
      .database()
      .ref('users/')
      .on('value', result => {
        let data = result.val();
        if (data !== null) {
          let users = Object.values(data);
          this.setState({
            users,
          });
        }
      });
  };

  // componentWillUnmount() {
  //   Geolocation.stopObserving();
  // }

  changeRegion = (region, lat, long) => {
    this.setState({
      region: region,
      latitude: lat || this.state.latitude,
      longitude: long || this.state.longitude,
    });
  };

  render() {
    const {userId} = this.state;
    return (
      <Fragment>
        {this.state.isLoading == true ? (
          <View style={styles.container}>
            <ActivityIndicator color="#8de969" size={'large'} />
          </View>
        ) : (
          <View style={styles.container}>
            <MapView
              initialRegion={this.state.region}
              showsUserLocation={true}
              followUserLocation={true}
              zoomControlEnabled={false}
              showsCompass={true}
              minZoomLevel={0}
              maxZoomLevel={20}
              style={styles.map}>
              {this.state.users.map((item, index) => (
                <Marker
                  onCalloutPress={() =>
                    item.uid == userId
                      ? null
                      : this.props.navigation.navigate('Chat', item)
                  }
                  key={index}
                  title={item.uid == userId ? 'You' : item.username}
                  description={item.uid == userId ? null : item.fullname}
                  coordinate={{
                    latitude: item.Location.latitude,
                    longitude: item.Location.longitude,
                  }}>
                  {item.uid == userId ? (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                      }}>
                      <Image
                        source={Mark}
                        style={{
                          flex: 1,
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ) : (
                    <View style={styles.avatar}>
                      <Image source={{uri: item.photo}} style={styles.image} />
                    </View>
                  )}
                </Marker>
              ))}
            </MapView>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
  },
  avatar: {
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'grey',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(Maps);
