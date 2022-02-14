import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {useTheme} from '../../theme/ThemeProvider';

import IText from '../IText';

const GreyButton = props => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: colors.darkMode.background}]}
    >
      <IText style={{padding: 5}}>{props.label}</IText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
});

export default GreyButton;
