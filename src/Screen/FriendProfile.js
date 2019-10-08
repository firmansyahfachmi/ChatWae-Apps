import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';

import {Tab, Tabs, Icon} from 'native-base';

import {withNavigation} from 'react-navigation';

class Profile extends Component {
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

        <View style={styles.div}>
          <View style={styles.top}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/526/200/200',
              }}
              style={styles.profileImg}
            />
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}></View>
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
              <TouchableOpacity activeOpacity={0.8}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="chat"
                  style={{color: 'white', fontSize: 22}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.name}>
              <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
                Name
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.title}>Username</Text>
              <Text style={styles.sub}>name</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.title}>Fullname</Text>
              <Text style={styles.sub}>name</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.sub}>name</Text>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  profileImg: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    height: '100%',
  },
  name: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    padding: 20,
  },
  div: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  title: {
    fontSize: 18,
    color: '#433a3f',
    fontWeight: '700',
  },
  sub: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: 'grey',
  },
  field: {
    height: 'auto',
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
    // borderRadius: 5,
    padding: 10,
    elevation: 3,
    borderLeftWidth: 2,
    borderColor: '#8de969',
  },
  content: {
    height: 'auto',
    width: '100%',
    padding: 18,
  },

  top: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'silver',
  },
  iconBack: {
    justifyContent: 'center',
    width: '91%',
    alignItems: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },

  header: {
    height: 60,
    width: '100%',
    padding: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withNavigation(Profile);
