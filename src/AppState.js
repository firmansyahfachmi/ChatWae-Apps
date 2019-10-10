import React, {Component} from 'react';
import {AppState, Text} from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

class AppStateExample extends Component {
  state = {
    appState: AppState.currentState,
    userId: '',
  };

  componentDidMount = async () => {
    this.setState({userId: await AsyncStorage.getItem('uid')});
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.userId === null) {
      if (
        this.state.appState.match(/active|background/) &&
        nextAppState === 'active'
      ) {
        firebase
          .database()
          .ref('users/' + this.state.userId)
          .update({status: 'Online'});
      } else if (
        this.state.appState.match(/active|background/) &&
        nextAppState === 'background'
      ) {
        firebase
          .database()
          .ref('users/' + this.state.userId)
          .update({status: 'Offline'});
      }
    } else {
      return null;
    }
    this.setState({appState: nextAppState});
  };

  render() {
    return null;
  }
}

export default AppStateExample;
