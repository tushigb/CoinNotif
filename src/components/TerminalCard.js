import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FIcon from 'react-native-vector-icons/dist/Fontisto';

import {useTheme} from '../theme/ThemeProvider';

import IText from './IText';

const PrimaryButton = props => {
  const {colors} = useTheme();

  const [isExpanded, setExpanded] = useState(false);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        props.isExpanded
          ? colors.gradient.primary
          : [colors.terminalCard.background, colors.terminalCard.background]
      }
      style={styles.gradientContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
        style={[
          {backgroundColor: colors.terminalCard.background},
          styles.container,
        ]}>
        <View style={[styles.flexContainer]}>
          <FIcon
            name="shopping-pos-machine"
            size={25}
            style={{color: colors.text.primary, marginRight: 10}}
          />
          <IText>12341234</IText>
        </View>
        <IText>0 ₮</IText>
      </TouchableOpacity>

      {props.isExpanded && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <IText color="#FFF">Хуулга харах</IText>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <IText color="#FFF">Дэлгэрэнгүй мэдээлэл</IText>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <IText color="#FFF">Товч нэр солих</IText>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 20,
    marginBottom: 10,
  },
  container: {
    padding: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {},
  menuItem: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#FFF',
  },
});

export default PrimaryButton;
