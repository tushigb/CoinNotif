import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from '../../theme/ThemeProvider';

import {Context as AuthContext} from '../../context/AuthContext';
import {Context as LoaderContext} from '../../context/LoaderContext';

import AuthStack from '../../navigation/AuthStackNavigation';
import TabNavigation from '../../navigation/TabNavigation';

import Loader from '../../components/Loader';

const AppLayout = props => {
  const {state} = useContext(AuthContext);

  useEffect(() => {}, []);

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
