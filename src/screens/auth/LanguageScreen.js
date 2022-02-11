import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../theme/ThemeProvider';

import I18n from '../../utils/i18n';

import IText from '../../components/IText';

const LanguageScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();

  useEffect(() => {});

  const changeLanguage = language => {
    AsyncStorage.setItem('language', language);
    I18n.locale = language;
    navigation.navigate('Onboard', {});
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar hidden />
      <View style={[styles.languageContainer]}>
        <Image
          source={require('../../assets/images/earth.png')}
          style={{width: width - 80, height: width - 80}}
        />
        <View style={[{}, styles.selectContainer]}>
          <TouchableOpacity
            style={[
              {backgroundColor: colors.darkMode.background},
              styles.language,
            ]}
            onPress={() => {
              changeLanguage('en');
            }}
          >
            <IText style={{padding: 10}}>ENGLISH</IText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {backgroundColor: colors.darkMode.background},
              styles.language,
            ]}
            onPress={() => {
              changeLanguage('mn');
            }}
          >
            <IText style={{padding: 10}}>МОНГОЛ</IText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  languageContainer: {
    alignItems: 'center',
  },
  selectContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  language: {
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default LanguageScreen;
