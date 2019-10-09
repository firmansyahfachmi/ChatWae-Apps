import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {withNavigation} from 'react-navigation';
import {Item, Label, Input, Toast} from 'native-base';
import firebase from 'firebase';

import Background from '../Assets/background.jpg';
import Logo3 from '../Assets/ChatWaeTiga.png';

import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  handleSubmit = async () => {
    const {email, password} = this.state;
    this.setState({isLoading: true});
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        await firebase
          .database()
          .ref('users/' + res.user.uid)
          .update({status: 'Online'});

        let currentUser = firebase.auth().currentUser;

        AsyncStorage.setItem('uid', currentUser.uid);
        AsyncStorage.setItem('username', currentUser.displayName);
        AsyncStorage.setItem('email', currentUser.email);
        AsyncStorage.setItem('photo', currentUser.photoURL);

        this.setState({isLoading: false});
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        this.setState({isLoading: false});
        Toast.show({
          text: err.message,
          buttonText: 'Ok',
          type: 'danger',
          position: 'bottom',
          duration: 3000,
          style: styles.toast,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <View>
          <StatusBar backgroundColor={'#433a3f'} />
        </View>
        {/* <Image source={Background} style={styles.background} /> */}
        <View style={styles.background}></View>

        <View style={styles.header}>
          <Image
            source={Logo3}
            style={{
              resizeMode: 'contain',
              width: 150,
              flex: 1,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text
            style={{
              color: 'white',
              fontSize: 40,
              fontWeight: '700',
              marginBottom: 15,
              marginLeft: 10,
            }}>
            Login
          </Text>
          <View style={{alignItems: 'center', paddingHorizontal: 10}}>
            <Item floatingLabel style={styles.field}>
              <Label style={{color: 'whitesmoke'}}>Email</Label>
              <Input
                style={{color: 'whitesmoke'}}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={text => this.setState({email: text})}
              />
            </Item>
            <Item floatingLabel style={styles.field}>
              <Label style={{color: 'whitesmoke'}}>Password</Label>
              <Input
                style={{color: 'whitesmoke'}}
                secureTextEntry={true}
                onChangeText={text => this.setState({password: text})}
              />
            </Item>
            {this.state.isLoading == false ? (
              <TouchableOpacity
                onPress={this.handleSubmit}
                activeOpacity={0.8}
                style={styles.buttonLogin}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                  Login
                </Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                color="#8de969"
                size={'large'}
                style={{marginTop: 30}}
              />
            )}

            <View style={styles.regis}>
              <Text style={{color: 'white'}}>
                Don't have any account ?&nbsp;
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{color: '#8de969', fontWeight: '700'}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  toast: {
    margin: 15,
    borderRadius: 5,
  },
  regis: {
    marginTop: 55,
    height: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLogin: {
    backgroundColor: '#8de969',
    width: '80%',
    height: 50,
    marginTop: 40,
    borderRadius: 50,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    padding: 3,
    marginTop: 8,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    flex: 1,
    backgroundColor: '#433a3f',
  },
  container: {
    backgroundColor: 'silver',
    height: '100%',
    width: '100%',
  },

  header: {
    height: 80,
    width: '100%',
    padding: 20,
    alignItems: 'flex-start',
  },
});

export default withNavigation(Login);
