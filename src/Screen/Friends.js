import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Tab, Tabs} from 'native-base';

import {withNavigation} from 'react-navigation';

import CardChat from '../Components/CardChat';

class Friends extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <CardChat />
          <CardChat />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});

export default withNavigation(Friends);
