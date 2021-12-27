import 'react-native-gesture-handler';
import React from 'react';
import 'react-native-reanimated';
import {LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLayout from './src/screens/layout/AppLayout';
import {Provider as AuthProvider} from './src/context/AuthContext';
// import 'intl';
// import 'intl/locale-data/jsonp/en';

LogBox.ignoreLogs(['VirtualizedLists', 'Require cycle:']);

const App = () => {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
};

export default App;
