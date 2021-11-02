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
      style={[styles.container, {backgroundColor: props.color}]}>
      <Icon name={props.icon} size={25} style={{color: '#FFF'}} />
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
