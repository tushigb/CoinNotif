import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import I18n from '../utils/i18n';
import {useTheme} from '../theme/ThemeProvider';

import Init from '../screens/app/chart/InitScreen';

const HomeStack = props => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Init'}>
      <Stack.Screen
        name="Init"
        component={Init}
        options={{
          title: t('menu.title.chart'),
          headerTitleStyle: {
            color: colors.header.title,
            fontFamily: 'Rubik-Light',
            fontWeight: '300',
            fontSize: 34,
          },
          headerTitleAlign: 'left',
          animationTypeForReplace: 'pop',
          headerShown: true,
          cardStyle: {
            backgroundColor: colors.background.primary,
          },
          headerStyle: {
            backgroundColor: colors.background.primary,
            height: height / 6,
            shadowColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
