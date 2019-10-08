import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {Tab, Tabs, Icon} from 'native-base';

import {withNavigation} from 'react-navigation';

import Friends from './Friends';
import Maps from './Maps';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <View>
          <StatusBar backgroundColor={'#3b3438'} />
        </View>
        <View style={styles.header}>
          <Text style={styles.heading}>ChatWae</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}
            activeOpacity={0.8}
            style={{justifyContent: 'center'}}>
            <Icon
              type="AntDesign"
              name="user"
              style={{color: 'white', fontSize: 26}}
            />
          </TouchableOpacity>
        </View>
        <Tabs tabBarUnderlineStyle={styles.underline} locked={true}>
          <Tab
            heading="MAPS"
            tabStyle={styles.tabHead}
            textStyle={styles.textHead}
            activeTabStyle={{
              backgroundColor: '#433a3f',
            }}
            activeTextStyle={styles.textActive}>
            <Maps />
          </Tab>
          <Tab
            heading="FRIENDS"
            tabStyle={styles.tabHead}
            textStyle={styles.textHead}
            activeTabStyle={{
              backgroundColor: '#433a3f',
            }}
            activeTextStyle={styles.textActive}>
            <Friends />
          </Tab>
        </Tabs>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  textActive: {
    color: '#8de969',
    fontWeight: '700',
  },
  textHead: {
    color: 'silver',
    fontWeight: '700',
  },
  tabHead: {
    backgroundColor: '#433a3f',
  },
  underline: {
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderColor: '#8de969',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    width: '90%',
  },
  header: {
    backgroundColor: '#433a3f',
    height: 'auto',
    width: '100%',
    padding: 12,
    zIndex: 2,
    flexDirection: 'row',
  },
});

export default withNavigation(Home);
