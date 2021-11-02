import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '../theme/ThemeProvider';

import IText from './IText';

const PrimaryButton = props => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors.gradient.primary}
        style={[props.style, styles.button]}>
        <IText style={{color: '#FFFFFF'}}>{props.label}</IText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
  },
});

export default PrimaryButton;
