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
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import {Icon, Toast} from 'native-base';

import {withNavigation} from 'react-navigation';

import firebase from '../Config/Firebase';

import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      profile: {},
      isLoading: false,
      edit: false,
      loadingPage: true,
    };
  }

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  componentDidMount = async () => {
    this.setState({userId: await AsyncStorage.getItem('uid')});
    firebase
      .database()
      .ref('users/' + this.state.userId)
      .once('value')
      .then(res => {
        this.setState({loadingPage: false});
        let profile = res.val();
        if (profile !== null) {
          this.setState({
            profile,
          });
        }
      });
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
          .update({status: 'Offline'});

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

  handleChange = (name, value) => {
    let newFormData = {...this.state.profile};
    newFormData[name] = value;
    this.setState({
      profile: newFormData,
    });
  };

  handleSave = () => {
    const {profile} = this.state;
    this.setState({isLoading: true});
    firebase
      .database()
      .ref('users/' + this.state.userId)
      .update(profile)
      .then(async () => {
        AsyncStorage.setItem('email', profile.email);
        AsyncStorage.setItem('username', profile.username);
        this.setState({isLoading: false});
        this.setState({edit: false});
        Toast.show({
          text: `Profile Updated`,
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 4000,
          style: styles.toast,
        });
      })
      .catch(err => {
        Toast.show({
          text: ' Saving profile failed, ' + err.message,
          position: 'bottom',
          type: 'danger',
          duration: 4000,
          style: styles.toast,
        });
      });
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
        {this.state.loadingPage == true ? (
          <View style={styles.container}>
            <ActivityIndicator color="#8de969" size={'large'} />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.div}>
              <View style={styles.top}>
                <View style={styles.img}>
                  <Image
                    source={{uri: this.state.profile.photo}}
                    style={styles.photo}
                  />
                </View>
              </View>
              <View style={styles.content}>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  {this.state.edit == false ? (
                    <TouchableOpacity
                      onPress={() => this.setState({edit: true})}
                      activeOpacity={0.8}
                      style={styles.butEdit}>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="pencil"
                        style={{color: '#8de969', fontSize: 20}}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <View style={styles.field}>
                  <Text style={styles.title}>Username</Text>
                  {this.state.edit == false ? (
                    <Text style={styles.info}>
                      {this.state.profile.username}
                    </Text>
                  ) : (
                    <TextInput
                      style={styles.input}
                      defaultValue={this.state.profile.username}
                      onChangeText={text => this.handleChange('username', text)}
                    />
                  )}
                </View>
                <View style={styles.field}>
                  <Text style={styles.title}>Fullname</Text>
                  {this.state.edit == false ? (
                    <Text style={styles.info}>
                      {this.state.profile.fullname}
                    </Text>
                  ) : (
                    <TextInput
                      style={styles.input}
                      defaultValue={this.state.profile.fullname}
                      onChangeText={text => this.handleChange('fullname', text)}
                    />
                  )}
                </View>
                <View style={styles.field}>
                  <Text style={styles.title}>Email</Text>
                  {this.state.edit == false ? (
                    <Text style={styles.info}>{this.state.profile.email}</Text>
                  ) : (
                    <TextInput
                      style={styles.input}
                      defaultValue={this.state.profile.email}
                      onChangeText={text => this.handleChange('email', text)}
                    />
                  )}
                </View>
              </View>
              {this.state.edit == true ? (
                this.state.isLoading == false ? (
                  <TouchableOpacity
                    onPress={this.handleSave}
                    activeOpacity={0.8}
                    style={styles.button}>
                    <Text
                      style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                      Save
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.spin}>
                    <ActivityIndicator color="#8de969" size={'large'} />
                  </View>
                )
              ) : null}
            </View>
          </ScrollView>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: '70%',
    flex: 1,
    resizeMode: 'contain',
  },
  spin: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  butEdit: {
    backgroundColor: '#433a3f',
    borderRadius: 3,
    padding: 4,
    elevation: 2,
    marginTop: -30,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  toast: {
    margin: 15,
    borderRadius: 5,
  },
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
  info: {
    marginVertical: 3,
    paddingHorizontal: 0,
    color: 'grey',
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
    backgroundColor: 'white',
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
    backgroundColor: 'whitesmoke',
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
