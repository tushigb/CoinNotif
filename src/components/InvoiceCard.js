import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import I18n from '../utils/i18n';
import {useTheme} from '../theme/ThemeProvider';

import IText from './IText';

const InvoiceCard = props => {
  const {colors} = useTheme();
  const {t} = I18n;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, {backgroundColor: colors.background.primary}]}>
      <View style={[styles.header]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: colors.invoiceType.success},
            ]}>
            <Icon
              name={'checkmark-outline'}
              size={25}
              style={{color: '#FFF'}}
            />
          </View>
          <IText style={{marginLeft: 10}}>{props.label}</IText>
        </View>
        <IText>{props.amount}</IText>
      </View>
      <View style={[styles.divider, {borderColor: colors.text.primary}]} />
      <View style={[styles.body]}>
        <View style={styles.row}>
          <IText light color={colors.text.gray}>
            {t('payment.invoice_number')}
          </IText>
          <IText light color={colors.text.gray}>
            {props.invoiceNumber}
          </IText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  body: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InvoiceCard;
