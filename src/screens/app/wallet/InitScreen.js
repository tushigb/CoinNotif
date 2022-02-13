import React, {useState, useContext} from 'react';
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
} from 'react-native';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';
import FIcon from 'react-native-vector-icons/dist/Feather';

import IText from '../../../components/IText';
import TerminalCard from '../../../components/TerminalCard';
import PrimaryButton from '../../../components/PrimaryButton';
import {useEffect} from 'react/cjs/react.development';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  // animation states
  const [firstCardAnimation] = useState(new Animated.Value(0));
  const [secondCardAnimation] = useState(new Animated.Value(0));
  const [firstCardXAnimation] = useState(new Animated.Value(-1000));
  const [secondCardXAnimation] = useState(new Animated.Value(1000));
  const [mainCardXAnimation] = useState(new Animated.Value(-1000));

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
      }
    });
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={{marginTop: 40, alignItems: 'center'}}>
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
              {formatter.format(28600).replace('$', '')}
            </IText>
          </View>
          <View>
            <IText>DEPOSIT</IText>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
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
});

export default InitScreen;
