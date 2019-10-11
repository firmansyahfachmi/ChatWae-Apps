import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import {Icon} from 'native-base';

import {withNavigation} from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'firebase';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      friendData: {},
      messages: [],
      myUid: '',
      myUsername: '',
      avatar: '',
      text: '',
      status: '',
    };
  }

  componentDidMount = async () => {
    firebase
      .database()
      .ref('users/' + this.state.friendData.uid)
      .on('value', result => {
        let data = result.val();
        if (data !== null) {
          let status = Object.values(data);
          this.setState({
            status,
          });
        }
      });
    this.setState({
      myUid: await AsyncStorage.getItem('uid'),
      myUsername: await AsyncStorage.getItem('username'),
      avatar: await AsyncStorage.getItem('photo'),
    });
    await this.setState({friendData: this.props.navigation.state.params});
    firebase
      .database()
      .ref('messages')
      .child(this.state.myUid)
      .child(this.state.friendData.uid)
      .on('child_added', value => {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, value.val()),
          };
        });
      });
  };

  sendMessage = () => {
    if (this.state.text.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.myUid)
        .child(this.state.friendData.uid)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.myUid,
          name: this.state.myUsername,
          // avatar: this.state.avatar,
        },
      };
      updates[
        'messages/' +
          this.state.myUid +
          '/' +
          this.state.friendData.uid +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.friendData.uid +
          '/' +
          this.state.myUid +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({text: ''});
    }
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#77d154',
            borderRadius: 8,
          },
          left: {
            borderRadius: 8,
          },
        }}
      />
    );
  }

  render() {
    const {friendData} = this.state;
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
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.2)"
            onPress={() =>
              this.props.navigation.navigate('FriendProfile', friendData)
            }
            style={styles.headSub}>
            <>
              <View style={styles.img}>
                <Image source={{uri: friendData.photo}} style={styles.photo} />
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={styles.heading}>{friendData.username}</Text>
                <Text style={{color: 'white'}}>
                  {this.state.status || friendData.status}
                </Text>
              </View>
            </>
          </TouchableHighlight>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.sendMessage}
          showAvatarForEveryMessage={true}
          renderBubble={this.renderBubble}
          renderAvatar={() => null}
          alignTop={true}
          user={{
            _id: this.state.myUid,
            name: this.state.myUsername,
            // avatar: this.state.avatar,
          }}
          onInputTextChanged={value => this.setState({text: value})}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  headSub: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    height: '100%',
  },
  img: {
    backgroundColor: 'silver',
    width: 38,
    height: 38,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  iconBack: {
    justifyContent: 'center',
    width: '12%',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    width: 'auto',
  },
  header: {
    backgroundColor: '#433a3f',
    height: 60,
    width: '100%',
    paddingHorizontal: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withNavigation(Profile);
