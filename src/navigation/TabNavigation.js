import React, {useEffect, useReducer, useContext, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, Animated, LayoutAnimation, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {useTheme} from '../theme/ThemeProvider';

import HomeStack from './HomeStackNavigation';
import WalletStack from './WalletStackNavigation';
import QRStack from './QRStackNavigation';
import ChartStack from './ChartStackNavigation';
import ProfileStack from './ProfileStackNavigation';

const TabNavigation = ({route}) => {
  const {colors} = useTheme();

  useEffect(() => {}, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: 'transparent',
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon = 'home';
          switch (route.name) {
            case 'Home':
              icon = focused ? 'home' : 'home-outline';
              break;
            case 'Wallet':
              icon = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'QR':
              icon = focused ? 'qr-code' : 'qr-code-outline';
              break;
            case 'Chart':
              icon = focused ? 'pie-chart' : 'pie-chart-outline';
              break;
            case 'Profile':
              icon = focused ? 'person' : 'person-outline';
              break;
            default:
              icon = 'home-outline';
              break;
          }
          return (
            <View style={styles.menu}>
              <Icon
                name={icon}
                size={25}
                style={{color: focused ? colors.menu.bottom.icon : '#A3A5BA'}}
                // style={{color: colors.menu.bottom.icon}}
              />
              <Animated.View
                style={[
                  {
                    backgroundColor: colors.menu.bottom.icon,
                  },
                ]}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // _handleMenu(route.name.toLowerCase());
          },
        })}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // _handleMenu(route.name.toLowerCase());
          },
        })}
        name="Wallet"
        component={WalletStack}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // _handleMenu(route.name.toLowerCase());
          },
        })}
        name="QR"
        component={QRStack}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // _handleMenu(route.name.toLowerCase());
          },
        })}
        name="Chart"
        component={ChartStack}
      />
      <Tab.Screen
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // _handleMenu(route.name.toLowerCase());
          },
        })}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
  },
  line: {
    height: 3,
    marginTop: 3,
    borderRadius: 10,
  },
});

export default TabNavigation;
