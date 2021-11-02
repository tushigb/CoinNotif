import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLayout from './src/screens/layout/AppLayout';
import {Provider as AuthProvider} from './src/context/AuthContext';

LogBox.ignoreLogs(['VirtualizedLists', 'Require cycle:']);

const App: () => React$Node = () => {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
};

export default App;
