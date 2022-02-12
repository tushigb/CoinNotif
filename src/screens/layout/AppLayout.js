import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from '../../theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Context as AuthContext} from '../../context/AuthContext';
import {Context as LoaderContext} from '../../context/LoaderContext';

import AuthStack from '../../navigation/AuthStackNavigation';
import TabNavigation from '../../navigation/TabNavigation';

import I18n from '../../utils/i18n';

import Loader from '../../components/Loader';

const AppLayout = props => {
  const {state, signin} = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(result => {
      AsyncStorage.getItem('user').then(res => {
        signin({token: result, user: JSON.parse(res).user});
        setToken(result);
      });
    });
    AsyncStorage.getItem('language').then(result => {
      I18n.locale = result;
    });
  }, []);

  return (
    // <AppearanceProvider>
    <ThemeProvider>
      <NavigationContainer>
        {state.loading && <Loader />}
        {state.token === null ? <AuthStack /> : <TabNavigation />}
      </NavigationContainer>
    </ThemeProvider>
    // </AppearanceProvider>
  );
};

export default AppLayout;
