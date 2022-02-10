import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import I18n from '../utils/i18n';
import {useTheme} from '../theme/ThemeProvider';

import Onboard from '../screens/auth/OnboardScreen';
import Login from '../screens/auth/LoginScreen';
import Register from '../screens/auth/RegisterScreen';
import Pin from '../screens/auth/PinScreen';

const AuthStack = props => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Onboard'}>
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{
          title: 'Onboard',
          animationTypeForReplace: 'pop',
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          animationTypeForReplace: 'pop',
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          animationTypeForReplace: 'pop',
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}
      />
      <Stack.Screen
        name="Pin"
        component={Pin}
        options={{
          title: 'Pin',
          animationTypeForReplace: 'pop',
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
