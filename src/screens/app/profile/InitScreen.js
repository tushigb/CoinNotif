import React, {useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import Separator from '../../../components/Separator';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, setLoading, signout, test} = useContext(AuthContext);

  const changeLanguage = async language => {
    setLoading(true);
    await AsyncStorage.setItem('language', language);
    I18n.locale = language;
    setLoading(false);
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, {}]}>
        <Image
          source={require('../../../assets/images/profile.png')}
          style={{height: width / 5, width: width / 5, resizeMode: 'contain'}}
        />
        {/* <TouchableOpacity
          style={[styles.editButton, {borderColor: colors.darkMode.label}]}
        >
          <IText>{t('profile.edit')}</IText>
        </TouchableOpacity> */}
      </View>

      <ScrollView
        style={{flex: 1}}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={{marginTop: 20}}
      >
        <View
          style={[
            styles.settingsContainer,
            {
              borderColor: colors.text.primary,
            },
          ]}
        >
          <View style={[styles.box, {borderColor: colors.text.primary}]}>
            <TouchableOpacity style={[styles.settingsItem, {}]}>
              <IText>{t('common.mobile').toUpperCase()}</IText>
              <IText>
                {'+' +
                  state.user.phone.extension +
                  ' ' +
                  state.user.phone.number}
              </IText>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.settingsItem, {}]}>
            <IText>{t('common.email').toUpperCase()}</IText>
            <IText>EMAIL</IText>
          </TouchableOpacity> */}
          </View>

          <View
            style={[
              styles.box,
              {borderColor: colors.text.primary, marginTop: 20},
            ]}
          >
            <View style={[styles.settingsItem, {}]}>
              <IText>{t('common.appearance').toUpperCase()}</IText>
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
                    style={[
                      {color: colors.darkMode.label},
                      styles.darkModeIcon,
                    ]}
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
                    style={[
                      {color: colors.darkMode.label},
                      styles.darkModeIcon,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.settingsItem, {}]}>
              <IText>{t('common.language').toUpperCase()}</IText>
              <View
                style={[
                  {backgroundColor: colors.darkMode.background},
                  styles.darkModeBoxBackground,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    changeLanguage('mn');
                  }}
                >
                  <IText style={styles.languageIcon}>MN</IText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    changeLanguage('en');
                  }}
                >
                  <IText style={styles.languageIcon}>EN</IText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.box,
              {borderColor: colors.text.primary, marginTop: 20},
            ]}
          >
            <View style={[styles.settingsItem, {}]}>
              <IText>{t('profile.terms').toUpperCase()}</IText>
              <View
                style={[
                  {backgroundColor: colors.darkMode.background},
                  styles.darkModeBoxBackground,
                ]}
              >
                <TouchableOpacity onPress={() => {}}>
                  <Icon
                    name={'chevron-forward'}
                    size={30}
                    style={[
                      {color: colors.darkMode.label},
                      // styles.darkModeIcon,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.settingsItem, {}]}>
              <IText>{t('profile.fb').toUpperCase()}</IText>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`http://m.me/tushighen`);
                }}
              >
                <Image
                  source={require('../../../assets/images/social/fb.png')}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.settingsItem, {}]}>
              <IText>{t('profile.ig').toUpperCase()}</IText>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('instagram://user?username=tushgb');
                }}
              >
                <Image
                  source={require('../../../assets/images/social/ig.png')}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'flex-end', padding: 20}}>
          <TouchableOpacity
            style={[
              styles.darkModeBoxBackground,
              {
                backgroundColor: colors.darkMode.background,
                paddingHorizontal: 20,
                paddingVertical: 10,
              },
            ]}
            onPress={() => {
              AsyncStorage.removeItem('accessToken');
              signout();
            }}
          >
            <Icon
              name={'exit-outline'}
              size={25}
              style={[{color: colors.change.negative, marginRight: 5}]}
            />
            <IText style={{color: colors.darkMode.label}}>
              {t('common.logout')}
            </IText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  settingsContainer: {
    marginTop: 20,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
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
  languageIcon: {
    padding: 10,
  },
  box: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
  },
});

export default InitScreen;
