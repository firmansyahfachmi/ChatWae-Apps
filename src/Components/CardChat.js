import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

import {withNavigation} from 'react-navigation';

class CardChat extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <TouchableHighlight
          underlayColor="whitesmoke"
          onPress={() =>
            this.props.navigation.navigate('Chat', this.props.data)
          }
          style={styles.card}>
          <>
            <View style={styles.img}>
              <View style={styles.avatar}>
                <Image
                  source={{uri: this.props.data.photo}}
                  style={{flex: 1, width: '70%', resizeMode: 'contain'}}
                />
              </View>
            </View>
            <View style={styles.desc}>
              <Text style={styles.name}>{this.props.data.username}</Text>
              <Text style={styles.msg}>{this.props.data.status}</Text>
            </View>
          </>
        </TouchableHighlight>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  msg: {
    flex: 1,
    color: 'grey',
  },
  name: {
    fontSize: 18,
    flex: 1,
    fontWeight: '700',
  },
  avatar: {
    backgroundColor: 'silver',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 70,
    paddingHorizontal: 7,
    paddingBottom: 12,
    paddingTop: 3,
  },
  desc: {
    borderBottomWidth: 1,
    borderColor: 'whitesmoke',
    width: '80%',
    width: '75%',
    marginLeft: 15,
  },
  card: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default withNavigation(CardChat);
