import React, {useState, useContext} from 'react';
import {
  StatusBar,
  StyleSheet,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import TerminalCard from '../../../components/TerminalCard';
import PrimaryButton from '../../../components/PrimaryButton';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default InitScreen;
