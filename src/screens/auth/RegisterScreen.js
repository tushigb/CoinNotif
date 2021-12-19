import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  UIManager,
  Platform,
  Dimensions,
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  StatusBar,
  Vibration,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {BarIndicator} from 'react-native-indicators';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';

import I18n from '../../utils/i18n';
import {useTheme} from '../../theme/ThemeProvider';
import {Context as AuthContext} from '../../context/AuthContext';

import IText from '../../components/IText';
import PrimaryButton from '../../components/PrimaryButton';

import {codes} from '../../constants/phones';

const RegisterScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const {signin} = useContext(AuthContext);

  const [scrollOffset, setScrollOffset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCodes, setCodes] = useState(false);
  const [isPhone, setIsPhone] = useState(true);
  const [showButton, setButton] = useState(false);
  const [user, setUser] = useState({phone: '', password: ''});
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('+976');

  const [data, setData] = useState([
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
    {
      label: '5',
      value: 5,
    },
    {
      label: '6',
      value: 6,
    },
    {
      label: '7',
      value: 7,
    },
    {
      label: '8',
      value: 8,
    },
    {
      label: '9',
      value: 9,
    },
    {
      label: '>',
      value: 9,
    },
    {
      label: '0',
      value: 0,
    },
    {
      label: '<',
      value: 9,
    },
  ]);

  useEffect(() => {
    if (user.password.length === 4) _signIn();
  }, [user.password]);

  const _signIn = async () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setLoading(true);
    setTimeout(() => {
      signin({});
    }, 5000);
  };

  const keyOnPress = item => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    if (item.label === '<') {
      if (isPhone) {
        setUser({...user, phone: user.phone.slice(0, user.phone.length - 1)});
        if (user.phone.length === 8) {
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
        if ((user.phone + item.label).length <= 14) {
          if ((user.phone + item.label).length > 4) {
            changeButton(true);
          }
          setUser({...user, phone: user.phone + item.label});
        }
      } else if ((user.password + item.label).length <= 4) {
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

  const next = async () => {
    if (isPhone) {
      const confirmation = await auth().signInWithPhoneNumber(
        code + user.phone,
      );
    }
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        isPhone ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setIsPhone(!isPhone);
    if (isPhone) setUser({...user, password: ''});
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
  for (let i = 0; i < 4; i++) {
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
      >
        <IText>
          {/* {user.password.length > i ? user.password.substring(i, i + 1) : ''} */}
          {/* {user.password.length > i ? '*' : ''} */}
        </IText>
      </View>,
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
                // setLoading(true);
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
                onPress={next}
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
          {!isPhone &&
            (!loading ? (
              <>
                <IText style={{textAlign: 'center', marginBottom: 10}}>
                  {t('login.password')}
                </IText>
                <View style={[styles.passwordInputContainer]}>
                  {passwordView}
                </View>
              </>
            ) : (
              <BarIndicator color={colors.text.primary} count={3} size={50} />
            ))}
        </View>
        <View
          style={[
            {backgroundColor: colors.loginKeyPad.background},
            styles.keyPad,
          ]}
        >
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{}}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={data}
            numColumns={3}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
              item.label !== '>' ? (
                <TouchableOpacity
                  onPress={() => {
                    keyOnPress(item);
                  }}
                  style={[
                    {
                      width: width / 3 - 30,
                      height: width / 3 - 50,
                    },
                    styles.key,
                  ]}
                >
                  {item.label === '<' ? (
                    <Icon
                      name={'backspace-outline'}
                      size={25}
                      style={{
                        color: colors.loginKeyPad.label,
                      }}
                    />
                  ) : (
                    <IText
                      regular
                      style={{color: colors.keyPad.label, fontSize: 24}}
                    >
                      {item.label}
                    </IText>
                  )}
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    {
                      width: width / 3 - 30,
                      height: width / 3 - 50,
                    },
                    styles.key,
                  ]}
                />
              )
            }
          />
        </View>
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

export default RegisterScreen;
