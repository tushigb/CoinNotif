import React, {useState, useContext, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Easing,
  Image,
  RefreshControl,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as WalletContext} from '../../../context/WalletContext';
import FIcon from 'react-native-vector-icons/dist/Feather';
import Modal from 'react-native-modal';

import IText from '../../../components/IText';
import GreyButton from '../../../components/button/GreyButton';
import TerminalCard from '../../../components/TerminalCard';
import PrimaryButton from '../../../components/PrimaryButton';

import {getRequest} from '../../../service/Service';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, setLoading} = useContext(AuthContext);
  const walletContext = useContext(WalletContext);

  // animation states
  const [firstCardAnimation] = useState(new Animated.Value(0));
  const [secondCardAnimation] = useState(new Animated.Value(0));
  const [firstCardXAnimation] = useState(new Animated.Value(-1000));
  const [secondCardXAnimation] = useState(new Animated.Value(1000));
  const [mainCardXAnimation] = useState(new Animated.Value(-1000));

  const [show, setShow] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [depLoading, setDepLoading] = useState(false);
  const [deposits, setDeposits] = useState(null);

  useEffect(() => {
    translate(1);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // animation

  const firstCard = firstCardAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '8deg'],
  });

  const secondCard = secondCardAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-4deg'],
  });

  const spin = isFirst => {
    Animated.timing(isFirst ? firstCardAnimation : secondCardAnimation, {
      toValue: 1,
      duration: isFirst ? 500 : 700,
      easing: Easing.spring,
      useNativeDriver: true,
    }).start();
  };

  const translate = num => {
    Animated.timing(
      num == 1
        ? firstCardXAnimation
        : num === 2
        ? secondCardXAnimation
        : mainCardXAnimation,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      },
    ).start(animation => {
      if (num === 1) translate(2);
      if (num === 2) translate(3);
      if (num === 3) {
        spin(true);
        spin(false);
        getDeposits();
      }
    });
  };

  const getRemarks = () => {
    setLoading(true);
    getRequest('wallet/invoice')
      .then(response => {
        setLoading(false);
        setShow(true);
        setRemarks(response.data.remarks);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const getDeposits = () => {
    setDepLoading(true);
    getRequest('wallet/deposits')
      .then(response => {
        setDeposits(response.data.deposits);
        walletContext.updateBalance({
          balance: response.data.balance,
          check: false,
        });
        setDepLoading(false);
      })
      .catch(err => {
        setDeposits([]);
        setDepLoading(false);
      });
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: colors.background.primary,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        <View style={{alignItems: 'center'}}>
          <Animated.View
            style={[{transform: [{translateX: firstCardXAnimation}]}]}
          >
            <Animated.View
              style={[
                styles.animationCard,
                {
                  transform: [{rotate: firstCard}],
                  width: width - 40,
                  backgroundColor: '#fabd42',
                },
              ]}
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                position: 'absolute',
                transform: [{translateX: secondCardXAnimation}],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.animationCard,
                {
                  transform: [{rotate: secondCard}],
                  width: width - 40,
                  backgroundColor: colors.change.negative,
                },
              ]}
            />
          </Animated.View>
          <Animated.View
            style={{
              borderRadius: 25,
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              width: width - 50,
              backgroundColor: colors.background.primary,
              transform: [{translateX: mainCardXAnimation}],
            }}
          >
            <View>
              <IText light style={{color: '#fabd42'}}>
                {t('wallet.available_balance')}
              </IText>
              <IText
                lines={1}
                adjustsFontSizeToFit
                medium
                style={{
                  color: colors.keyPad.label,
                  fontSize: 30,
                }}
              >
                {formatter
                  .format(walletContext.state.balance)
                  .replace('$', '₮')}
              </IText>
            </View>
            <GreyButton
              onPress={getRemarks}
              label={t('common.deposit').toUpperCase()}
            />
          </Animated.View>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <IText style={{marginTop: 10, fontSize: 24}}>
          {t('wallet.recent_deposits')}
        </IText>
      </View>
      <ScrollView
        style={{flex: 1, paddingHorizontal: 20, marginTop: 10, width: width}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={depLoading}
            onRefresh={getDeposits}
            tintColor={colors.text.primary}
          />
        }
      >
        {deposits &&
          deposits.length > 0 &&
          deposits.map((item, idx) => {
            return (
              <View
                key={idx}
                style={{
                  backgroundColor: colors.background.primary,
                  borderRadius: 15,
                  padding: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <IText regular>{item.remarks}</IText>
                  <IText light>{item.date.split('T')[0]}</IText>
                </View>
                <IText regular style={{color: colors.change.positive}}>
                  +{formatter.format(item.amount).replace('$', '')}₮
                </IText>
              </View>
            );
          })}
        {deposits && deposits.length === 0 && (
          <View style={{alignItems: 'center', padding: 20}}>
            <Image
              source={require('../../../assets/images/wallet/empty.png')}
              style={{
                height: width / 1.5,
                width: width / 1.5,
                resizeMode: 'contain',
              }}
            />
            <IText light lines={2}>
              {t('wallet.no_transaction_posted')}
            </IText>
          </View>
        )}
      </ScrollView>
      <Modal
        isVisible={show}
        backdropOpacity={0.5}
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setShow(!show);
        }}
        onBackdropPress={() => {
          setShow(!show);
        }}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        scrollOffsetMax={400 - 300}
        useNativeDriverForBackdrop
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
              height: height / 2,
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 30,
            },
          ]}
        >
          <View style={[{marginBottom: 20}]}>
            <IText style={{fontSize: 25}}>
              {t('wallet.golomt').toUpperCase()}
            </IText>
          </View>
          <View style={[styles.depositItem]}>
            <View>
              <IText light>{t('wallet.account').toUpperCase()}</IText>
              <IText style={{fontSize: 25}}>3250003674</IText>
            </View>
            <GreyButton
              onPress={() => {
                Clipboard.setString('3250003674');
              }}
              label={t('common.copy').toUpperCase()}
            />
          </View>
          <View style={[styles.depositItem]}>
            <View>
              <IText light>{t('wallet.name').toUpperCase()}</IText>
              <IText style={{fontSize: 25}}>Түшиг Баттөмөр</IText>
            </View>
            <GreyButton
              onPress={() => {
                Clipboard.setString('Түшиг Баттөмөр');
              }}
              label={t('common.copy').toUpperCase()}
            />
          </View>
          <View style={[styles.depositItem]}>
            <View>
              <IText light>{t('wallet.remarks').toUpperCase()}</IText>
              <IText style={{fontSize: 25}}>CBL:{remarks}</IText>
            </View>
            <GreyButton
              onPress={() => {
                Clipboard.setString('CBL:' + remarks);
              }}
              label={t('common.copy').toUpperCase()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  amount: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  animationCard: {
    borderRadius: 25,
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default InitScreen;
