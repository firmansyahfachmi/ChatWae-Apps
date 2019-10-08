import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {Icon} from 'native-base';

import {withNavigation} from 'react-navigation';

import firebase from '../Config/Firebase';

import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      photo: '',
      username: '',
    };
  }

  componentDidMount = async () => {
    this.setState({email: await AsyncStorage.getItem('email')});
    this.setState({photo: await AsyncStorage.getItem('photo')});
    this.setState({username: await AsyncStorage.getItem('username')});
  };

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        const userId = await AsyncStorage.getItem('uid');
        await firebase
          .database()
          .ref('users/' + userId)
          .update({status: 'offline'});

        AsyncStorage.removeItem('uid');
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('photo');

        this.props.navigation.navigate('Login');
      });
  };

  confirmation = () => {
    Alert.alert(
      'Log Out',
      'Are you sure want to log out this ChatWae account?',
      [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => this.handleLogout()},
      ],
      {cancelable: true},
    );
  };

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
          <Text style={styles.heading}>Profile</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={this.confirmation}>
            <Icon
              type="AntDesign"
              name="logout"
              style={{color: 'white', fontSize: 18}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.div}>
            <View style={styles.top}>
              <View style={styles.img}>
                <Image
                  source={{uri: this.state.photo}}
                  style={{width: '70%', flex: 1, resizeMode: 'contain'}}
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.field}>
                <Text style={styles.title}>Username</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={this.state.username}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Fullname</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={this.state.email}
                />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  div: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    marginRight: 20,
    backgroundColor: '#8de969',
    width: 120,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#433a3f',
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'whitesmoke',
    paddingVertical: 2,
    paddingHorizontal: 0,
    color: 'grey',
  },
  field: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },
  content: {
    height: 'auto',
    width: '100%',
    padding: 20,
  },
  img: {
    backgroundColor: 'whitesmoke',
    elevation: 2,
    width: 140,
    height: 140,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
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
