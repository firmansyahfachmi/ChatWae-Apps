import React, {Component, Fragment} from 'react';
import AppRoot from './src/Routes/AppNavigator';

import {Root} from 'native-base';

import AppIn from './src/AppState';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Root>
          <AppRoot />
          <AppIn />
        </Root>
      </Fragment>
    );
  }
}

export default App;
