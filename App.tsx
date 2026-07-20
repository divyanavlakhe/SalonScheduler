import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigator from './src/navigation';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
       <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={false}
        />
      <RootNavigator />
    </Provider>
  );
};

export default App;