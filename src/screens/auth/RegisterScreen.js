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
  ScrollView,
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

import {codes} from '../../constants/phones';

import {postRequest} from '../../service/Service';

const RegisterScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const {signin} = useContext(AuthContext);
  const {state, setLoading} = useContext(AuthContext);

  const [scrollOffset, setScrollOffset] = useState(null);
  const [showCodes, setCodes] = useState(false);
  const [isPhone, setIsPhone] = useState(true);
  const [showButton, setButton] = useState(false);
  const [user, setUser] = useState({phone: '', password: ''});
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('+1');
  const [length, setLength] = useState(10);

  useEffect(() => {
    user.password.length === 6 &&
      confirm
        .confirm(user.password)
        .then(result => {
          navigation.navigate('Pin', {phone: user.phone, code: code});
        })
        .catch(err => {
          setUser({...user, password: ''});
          alert(t('register.opt_wrong'));
        });
  }, [user.password]);

  const keyOnPress = item => {
    if (item.label === '<') {
      if (isPhone) {
        setUser({...user, phone: user.phone.slice(0, user.phone.length - 1)});
        if (user.phone.length === length) {
          changeButton(false);
        }
      } else {
        setUser({
          ...user,
          password: user.password.slice(0, user.password.length - 1),
        });
      }
    } else {
      if (isPhone) {
        if ((user.phone + item.label).length <= length) {
          if ((user.phone + item.label).length >= length) {
            changeButton(true);
          }
          setUser({...user, phone: user.phone + item.label});
        }
      } else if ((user.password + item.label).length <= 6) {
        setUser({...user, password: user.password + item.label});
      }
    }
  };

  const changeButton = show => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        show ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    setButton(show);
  };

  const checkIsExists = async () => {
    setLoading(true);
    postRequest('auth/exist', {
      number: user.phone,
      extension: code.replace('+', ''),
    })
      .then(response => {
        if (!response.data.exists) sendOTP();
        else {
          setLoading(false);
          alert(t('register.already_registered'));
        }
      })
      .catch(err => {
        setLoading(false);
        alert('Something went wrong');
      });
  };

  const sendOTP = async () => {
    isPhone &&
      auth()
        .signInWithPhoneNumber(code + user.phone)
        .then(result => {
          setConfirm(result);
          ReactNativeHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
          LayoutAnimation.configureNext(
            LayoutAnimation.create(
              250,
              isPhone
                ? LayoutAnimation.Types.easeOut
                : LayoutAnimation.Types.easeIn,
              LayoutAnimation.Properties.opacity,
            ),
          );
          setIsPhone(!isPhone);
          setUser({...user, password: ''});
          setLoading(false);
        });
  };

  const reset = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        isPhone ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setIsPhone(true);
    setUser({...user, password: ''});
  };

  const scrollRef = useRef();

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = p => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(p);
    }
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  const phoneView = [];
  const passwordView = [];
  for (let i = 0; i < 14; i++) {
    phoneView.push(
      <View key={i} style={{marginHorizontal: 0.5}}>
        <IText style={{fontSize: 14}}>
          {user.phone.length > i ? user.phone.substring(i, i + 1) : ''}
        </IText>
      </View>,
    );
  }
  for (let i = 0; i < 6; i++) {
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
      {/* <StatusBar hidden /> */}
      <View style={[styles.headerContainer]}>
        <IText>{t('common.register')}</IText>
      </View>
      <View style={styles.keyPadContainer}>
        <View style={{marginBottom: 20}}>
          <IText style={{textAlign: 'center', marginBottom: 10}}>
            {t('login.phone')}
          </IText>
          <View
            style={{
              marginBottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(
                    250,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.opacity,
                  ),
                );
                setCodes(!showCodes);
              }}
              style={{
                marginRight: 10,
                backgroundColor: colors.loginKeyPad.background,
                padding: 15,
                borderRadius: 15,
              }}
            >
              <IText style={{fontSize: 14}}>{code}</IText>
            </TouchableOpacity>
            <View
              style={[
                styles.phoneInputContainer,
                {
                  backgroundColor: colors.loginKeyPad.background,
                },
              ]}
            >
              {phoneView}
            </View>
            {showButton && (
              <TouchableOpacity
                onPress={isPhone ? checkIsExists : reset}
                style={{
                  marginLeft: 10,
                  backgroundColor: colors.loginKeyPad.background,
                  padding: 15,
                  borderRadius: 15,
                }}
              >
                <Icon
                  name={isPhone ? 'arrow-forward' : 'repeat'}
                  size={14}
                  style={{
                    color: colors.loginKeyPad.label,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {!isPhone && (
            <>
              <IText style={{textAlign: 'center', marginBottom: 10}}>
                {t('login.password')}
              </IText>
              <View style={[styles.passwordInputContainer]}>
                {passwordView}
              </View>
            </>
          )}
        </View>
        <KeyPad keyOnPress={keyOnPress} />
      </View>
      <Modal
        isVisible={showCodes}
        backdropOpacity={0.5}
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setCodes(!showCodes);
        }}
        onBackdropPress={() => {
          setCodes(!showCodes);
        }}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        scrollOffsetMax={400 - 300}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        useNativeDriverForBackdrop
        // scrollEnabled
        propagateSwipe
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View
          style={[
            {
              backgroundColor: colors.background.primary,
              height: height / 1.5,
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 30,
            },
          ]}
        >
          <ScrollView
            ref={scrollRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {codes.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setCode(item.dial_code);
                    setLength(item.length ? item.length : 14);
                    setCodes(!showCodes);
                  }}
                  style={{marginVertical: 5}}
                >
                  <IText
                    regular
                    style={{color: colors.keyPad.label, fontSize: 24}}
                  >
                    {item.code} - {item.name}
                  </IText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
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

export default RegisterScreen;
