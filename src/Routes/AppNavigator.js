import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../Screen/Splash';
import HomeScreen from '../Screen/Home';
import LoginScreen from '../Screen/Login';
import RegisterScreen from '../Screen/Register';
import ProfileScreen from '../Screen/Profile';
import ChatScreen from '../Screen/Chat';
import FriendProfileScreen from '../Screen/FriendProfile';

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      header: null,
    },
  },
  FriendProfile: {
    screen: FriendProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppRoot = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      Login: AuthStack,
      Register: RegisterScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default AppRoot;
