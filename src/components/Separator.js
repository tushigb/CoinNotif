import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const Separator = props => {
  const {colors} = useTheme();

  return (
    <View style={{borderBottomWidth: 1, borderColor: colors.text.primary}} />
  );
};

const styles = StyleSheet.create({});

export default Separator;
