import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import I18n from '../utils/i18n';
import {useTheme} from '../theme/ThemeProvider';

import Init from '../screens/app/qr/InitScreen';

const QRStack = props => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Init'}>
      <Stack.Screen
        name="Init"
        component={Init}
        options={{
          title: t('menu.title.qr'),
          headerTitleStyle: {
            color: colors.header.title,
          },
          animationTypeForReplace: 'pop',
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
          headerStyle: {
            backgroundColor: colors.background.primary,
            shadowColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default QRStack;
