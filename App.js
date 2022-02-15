import 'react-native-gesture-handler';
import React, {useEffect, useReducer, useContext, useState} from 'react';
import 'react-native-reanimated';
import {LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLayout from './src/screens/layout/AppLayout';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as WalletProvider} from './src/context/WalletContext';
import messaging from '@react-native-firebase/messaging';

// import 'intl';
// import 'intl/locale-data/jsonp/en';

import {putRequest} from './src/service/Service';

LogBox.ignoreLogs(['VirtualizedLists', 'Require cycle:']);

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const token = await messaging().getToken();
    putRequest('user/token', {
      token: token,
    })
      .then(response => {})
      .catch(err => {});
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <AppLayout />
      </WalletProvider>
    </AuthProvider>
  );
};

export default App;
