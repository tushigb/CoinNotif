import {View} from 'moti';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Ionicons';

import IText from './IText';

import {useTheme} from '../theme/ThemeProvider';

const CustomToast = props => {
  const {colors} = useTheme();

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <View
      style={[
        styles.container,
        {
          width: width - 40,
          backgroundColor: colors.background.primary,
        },
      ]}
    >
      <View>
        <IText style={{textTransform: 'capitalize'}} regular>
          {props.title}
        </IText>
        <IText style={{fontSize: 14}} light>
          {props.label}
        </IText>
      </View>
      <View style={[styles.icon, {backgroundColor: props.background}]}>
        <Icon name={props.icon} size={25} style={[{color: props.color}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 100,
    padding: 10,
  },
});

export default CustomToast;
