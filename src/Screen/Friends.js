import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import firebase from 'firebase';

import {withNavigation} from 'react-navigation';

import CardChat from '../Components/CardChat';

import AsyncStorage from '@react-native-community/async-storage';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      uid: '',
      chat: [],
      data: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    firebase
      .database()
      .ref('messages/' + uid)
      .on('child_added', data => {
        let person = data.val();
        person.id = data.key;
        this.state.chat.push({
          id: person.id,
        });
        this.setState({chat: this.state.chat});
      });

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

  render() {
    const users = this.state.users;
    const chat = this.state.chat;
    const data = [];
    chat.forEach((temp, key) => {
      data[key] = users.find(item => item.uid === temp.id);
    });
    console.log('s', data);
    return (
      <Fragment>
        <View style={styles.container}>
          {data.map(user => (
            <CardChat data={user} key={user.uid} />
          ))}
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
