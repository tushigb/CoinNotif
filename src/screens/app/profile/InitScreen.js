import React, {useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, {}]}>
        <Image
          source={require('../../../assets/images/profile.png')}
          style={{width: width / 5, height: width / 5}}
        />
        <TouchableOpacity
          style={[styles.editButton, {borderColor: colors.darkMode.label}]}
        >
          <IText>{t('profile.edit')}</IText>
        </TouchableOpacity>
      </View>
      <View style={styles.darkModeContainer}>
        <View
          style={[
            {backgroundColor: colors.darkMode.background},
            styles.darkModeBoxBackground,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setScheme('light');
            }}
          >
            <Icon
              name={'sunny-outline'}
              size={30}
              style={[{color: colors.darkMode.label}, styles.darkModeIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScheme('dark');
            }}
          >
            <Icon
              name={'moon-outline'}
              size={25}
              style={[{color: colors.darkMode.label}, styles.darkModeIcon]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.removeItem('accessToken');
          signout();
        }}
      >
        <IText>LOGOUT</IText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  editButton: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  darkModeContainer: {
    alignItems: 'center',
  },
  darkModeBoxBackground: {
    padding: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkModeIcon: {
    paddingHorizontal: 10,
  },
});

export default InitScreen;
