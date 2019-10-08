import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import {Icon} from 'native-base';

import {withNavigation} from 'react-navigation';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount = async () => {
    await this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <Fragment>
        <View>
          <StatusBar backgroundColor={'#3b3438'} />
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            activeOpacity={0.8}
            style={styles.iconBack}>
            <Icon
              type="AntDesign"
              name="arrowleft"
              style={{color: 'white', fontSize: 22}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FriendProfile')}
            activeOpacity={1}
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.img}></View>
            <Text style={styles.heading}>Name</Text>
          </TouchableOpacity>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    backgroundColor: 'silver',
    width: 38,
    height: 38,
    borderRadius: 50,
    marginHorizontal: 10,
  },

  iconBack: {
    justifyContent: 'center',
    width: '15%',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    width: '73%',
    marginLeft: 10,
  },
  header: {
    backgroundColor: '#433a3f',
    height: 60,
    width: '100%',
    padding: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withNavigation(Profile);
