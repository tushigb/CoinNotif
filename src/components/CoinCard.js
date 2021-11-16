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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, {backgroundColor: colors.background.primary}]}
    >
      {/* <View
        style={[
          styles.iconContainer,
          {backgroundColor: colors.invoiceType.success},
        ]}
      >
        <Icon name={'checkmark-outline'} size={25} style={{color: '#FFF'}} />
      </View> */}
      <View>
        <IText medium style={{fontSize: 16}}>
          {props.name}
        </IText>
        <IText light style={{fontSize: 16}}>
          {props.volume ? props.volume : props.fullname}
        </IText>
      </View>

      <View
        style={{
          alignItems: 'flex-end',
        }}
      >
        <IText light style={{fontSize: 16}}>
          {formatter.format(props.price).replace('$', '₮')}
        </IText>
        <IText
          light
          color={
            props.change < 0 ? colors.change.negative : colors.change.positive
          }
          style={{fontSize: 16}}
        >
          {(props.change > 0 ? '+' : '') + props.change + '%'}
        </IText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
