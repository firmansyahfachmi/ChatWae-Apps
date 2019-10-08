import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import firebase, {Firestore} from '../Config/Firebase';

import {withNavigation} from 'react-navigation';
import {Item, Label, Input, Toast} from 'native-base';
import Logo3 from '../Assets/ChatWaeTiga.png';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: '',
        fullname: '',
        email: '',
        photo:
          'https://www.shareicon.net/data/128x128/2016/11/21/854783_fett_459x512.png',
        password: '',
      },
      isLoading: false,
    };
  }

  handleChange = (name, value) => {
    let newFormData = {...this.state.formData};
    newFormData[name] = value;
    this.setState({
      formData: newFormData,
    });
  };

  handleSubmit = async () => {
    const {formData} = this.state;

    if (formData.username.length < 6) {
      Toast.show({
        text: 'Username must be 6 characters long or more',
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
        style: styles.toast,
      });
    } else if (formData.fullname.length < 6) {
      Toast.show({
        text: 'Fullname must be 6 characters long or more',
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
        style: styles.toast,
      });
    } else if (formData.password.length < 8) {
      Toast.show({
        text: 'Password must be 6 characters long or more',
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
        style: styles.toast,
      });
    } else {
      this.setState({isLoading: true});
      await firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(({user}) => {
          const userID = user.uid;
          let profile = firebase.auth().currentUser;
          profile.updateProfile({
            displayName: formData.username,
            photoURL: formData.photo,
          });
          firebase
            .database()
            .ref('users/' + userID)
            .set({
              username: formData.username,
              email: formData.email,
              fullname: formData.fullname,
              photo: formData.photo,
              status: 'offline',
            });

          Toast.show({
            text: `Successfuly Registered`,
            buttonText: 'Ok',
            type: 'success',
            position: 'bottom',
            duration: 4000,
            style: styles.toast,
          });

          this.setState({
            formData: {
              username: '',
              fullname: '',
              email: '',
              password: '',
            },
          });
          this.props.navigation.navigate('Login');
        })
        .catch(err => {
          this.setState({isLoading: false});
          let errMsg =
            err.code == 'auth/invalid-email' ? 'Email not valid' : err.message;
          Toast.show({
            text: errMsg,
            buttonText: 'Ok',
            type: 'danger',
            position: 'bottom',
            duration: 3000,
            style: styles.toast,
          });
        });
    }
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
        <ScrollView
          style={{
            height: '100%',
            paddingVertical: 30,
          }}>
          <View style={styles.content}>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                fontWeight: '700',
                marginBottom: 5,
                marginLeft: 10,
              }}>
              Register
            </Text>

            <View style={{alignItems: 'center', paddingHorizontal: 10}}>
              <Item floatingLabel style={styles.field}>
                <Label style={{color: 'whitesmoke'}}>Username</Label>
                <Input
                  style={{color: 'whitesmoke'}}
                  onChangeText={text => this.handleChange('username', text)}
                />
              </Item>
              <Item floatingLabel style={styles.field}>
                <Label style={{color: 'whitesmoke'}}>Fullname</Label>
                <Input
                  style={{color: 'whitesmoke'}}
                  onChangeText={text => this.handleChange('fullname', text)}
                />
              </Item>
              <Item floatingLabel style={styles.field}>
                <Label style={{color: 'whitesmoke'}}>Email</Label>
                <Input
                  style={{color: 'whitesmoke'}}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={text => this.handleChange('email', text)}
                />
              </Item>
              <Item floatingLabel style={styles.field}>
                <Label style={{color: 'whitesmoke'}}>Password</Label>
                <Input
                  secureTextEntry={true}
                  style={{color: 'whitesmoke'}}
                  onChangeText={text => this.handleChange('password', text)}
                />
              </Item>
              {this.state.isLoading === false ? (
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  activeOpacity={0.8}
                  style={styles.button}>
                  <Text
                    style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                    Register
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
                  Already have an account ?&nbsp;
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{color: '#8de969', fontWeight: '700'}}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    marginTop: 52,
    height: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
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
    padding: 1,
    marginTop: 12,
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

export default withNavigation(Register);
