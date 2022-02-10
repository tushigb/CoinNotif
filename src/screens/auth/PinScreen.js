import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  UIManager,
  Platform,
  Dimensions,
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {BarIndicator} from 'react-native-indicators';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import I18n from '../../utils/i18n';
import {useTheme} from '../../theme/ThemeProvider';
import {Context as AuthContext} from '../../context/AuthContext';

import IText from '../../components/IText';
import KeyPad from '../../components/KeyPad';

import {postRequest} from '../../service/Service';

const PinScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const {signin} = useContext(AuthContext);

  const [user, setUser] = useState({phone: '', password: ''});

  useEffect(() => {}, [user.password]);

  const keyOnPress = item => {
    console.log(item);
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  const passwordView = [];
  for (let i = 0; i < 6; i++) {
    passwordView.push(
      <View
        key={i}
        style={{
          backgroundColor: colors.loginKeyPad.background,
          borderRadius: 50,
          height: width / 8,
          width: width / 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 5,
          marginLeft: 5,
          borderWidth: user.password.length === i ? 2 : 0,
          borderColor: colors.text.primary,
        }}
      />,
    );
  }
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.login.background}]}
    >
      <View style={[styles.headerContainer]}>
        <IText>{t('common.register')}</IText>
      </View>
      <View style={styles.keyPadContainer}>
        <KeyPad keyOnPress={keyOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
  },
  inputContainer: {},
  phoneInputContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  passwordInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  keyPadContainer: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    left: 1,
  },
  keyPad: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  key: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});

export default PinScreen;
