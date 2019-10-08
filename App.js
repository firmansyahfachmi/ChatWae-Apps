import React, {Component} from 'react';
import AppRoot from './src/Routes/AppNavigator';

import {Root} from 'native-base';

class App extends Component {
  render() {
    return (
      <Root>
        <AppRoot />
      </Root>
    );
  }
}

export default App;
