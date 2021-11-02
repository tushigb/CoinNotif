import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import I18n from '../utils/i18n';
import {useTheme} from '../theme/ThemeProvider';

import Login from '../screens/auth/LoginScreen';

const AuthStack = props => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Login'}>
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
    </Stack.Navigator>
  );
};

export default AuthStack;
