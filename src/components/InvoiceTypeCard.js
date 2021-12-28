import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {useTheme} from '../theme/ThemeProvider';

import IText from './IText';

const InvoiceTypeCard = props => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(props.label);
      }}
      style={[
        styles.container,
        {
          backgroundColor: props.color,
          borderWidth: 1.5,
          borderColor: props.selected
            ? colors.darkMode.label
            : colors.background.primary,
        },
      ]}
    >
      <Icon
        name={props.icon}
        size={25}
        style={{color: colors.darkMode.label}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
  },
});

export default InvoiceTypeCard;
