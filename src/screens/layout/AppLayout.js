import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from '../../theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import {Context as AuthContext} from '../../context/AuthContext';
import {Context as WalletContext} from '../../context/WalletContext';

import AuthStack from '../../navigation/AuthStackNavigation';
import TabNavigation from '../../navigation/TabNavigation';

import I18n from '../../utils/i18n';

import Loader from '../../components/Loader';

import {putRequest} from '../../service/Service';

const AppLayout = props => {
  const {state, signin} = useContext(AuthContext);
  const walletContext = useContext(WalletContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    updateFCMToken();
    messaging().onMessage(async remoteMessage => {
      // walletContext.updateBalance({
      //   balance: parseInt(remoteMessage.notification.body),
      // });
      Toast.show({
        type: 'info',
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
        props: {icon: 'notifications-outline'},
      });
      walletContext.setCheck(true);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(result => {
      AsyncStorage.getItem('user').then(res => {
        if (res) {
          console.log(res);
          signin({token: result, user: JSON.parse(res).user});
          setToken(result);
        }
      });
    });
    AsyncStorage.getItem('language').then(result => {
      I18n.locale = result;
    });
  }, []);

  const updateFCMToken = async () => {
    const token = await messaging().getToken();
    putRequest('user/token', {
      token: token,
    })
      .then(response => {})
      .catch(err => {});
  };

  return (
    <NavigationContainer>
      {state.loading && <Loader />}
      {state.token === null ? <AuthStack /> : <TabNavigation />}
    </NavigationContainer>
  );
};

export default AppLayout;
