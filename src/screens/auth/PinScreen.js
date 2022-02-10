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

const PinScreen = ({navigation, route}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const {signin} = useContext(AuthContext);

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    if (route.params && route.params.code && route.params.phone) {
      setCode(route.params.code);
      setPhone(route.params.phone);
    }
  }, []);

  useEffect(() => {
    if (!isConfirm && pin.length === 4) {
      setConfirm(pin);
      setPin('');
      setIsConfirm(true);
    } else if (isConfirm && pin.length === 4) {
      if (confirm === pin) {
        postRequest('auth/register', {
          number: phone,
          extension: code.replace('+', ''),
          pin: pin,
        }).then(response => {
          if (response.data.accessToken) {
            AsyncStorage.setItem('accessToken', response.data.accessToken);
            signin({
              token: response.data.accessToken,
              user: {
                phone: {
                  extension: code.replace('+', ''),
                  number: phone,
                },
              },
            });
          }
        });
      } else {
        setConfirm('');
        setPin('');
        setIsConfirm(false);
      }
    }
  }, [pin]);

  const keyOnPress = item => {
    if (item.label === '<') {
      setPin(pin.slice(0, pin.length - 1));
    } else if (pin.length < 4) {
      setPin(pin + item.label);
    }
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  const passwordView = [];
  for (let i = 0; i < 4; i++) {
    passwordView.push(
      <View
        key={i}
        style={{
          backgroundColor: colors.loginKeyPad.background,
          borderRadius: 50,
          height: width / 12,
          width: width / 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 5,
          marginLeft: 5,
          borderWidth: pin.length === i ? 2 : 0,
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
        <IText>{t('common.pin')}</IText>
      </View>
      <View style={styles.keyPadContainer}>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <IText>{code + ' ' + phone}</IText>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={[styles.passwordInputContainer]}>{passwordView}</View>

          <View style={{marginTop: 10, alignItems: 'center'}}>
            <IText style={{fontSize: 14}}>
              {t(isConfirm ? 'register.enter_confirm' : 'register.enter_pin')}
            </IText>
          </View>
        </View>
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
});

export default PinScreen;
