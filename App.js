import 'react-native-gesture-handler';
import React, {useEffect, useReducer, useContext, useState} from 'react';
import 'react-native-reanimated';
import {LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLayout from './src/screens/layout/AppLayout';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as WalletProvider} from './src/context/WalletContext';
import {ThemeProvider} from './src/theme/ThemeProvider';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/ToastConfig';

// import 'intl';
// import 'intl/locale-data/jsonp/en';

import {putRequest} from './src/service/Service';

LogBox.ignoreLogs(['VirtualizedLists', 'Require cycle:']);

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  return (
    <AuthProvider>
      <WalletProvider>
        <ThemeProvider>
          <AppLayout />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </WalletProvider>
    </AuthProvider>
  );
};

export default App;
