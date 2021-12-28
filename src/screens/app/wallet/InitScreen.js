import React, {useState, useContext} from 'react';
import {
  StatusBar,
  StyleSheet,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';
import FIcon from 'react-native-vector-icons/dist/Feather';

import IText from '../../../components/IText';
import TerminalCard from '../../../components/TerminalCard';
import PrimaryButton from '../../../components/PrimaryButton';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  const [terminals, setTerminals] = useState([{}, {}, {}]);
  const [buttons] = useState([
    {
      color: '#6bc3dc',
      icon: 'arrow-up-right',
      label: t('wallet.send'),
    },
    {
      color: '#8de86e',
      icon: 'arrow-down-left',
      label: t('wallet.receive'),
    },
    {
      color: '#fabd42',
      icon: 'activity',
      label: t('wallet.pad'),
    },
  ]);
  const [selected, setSelected] = useState(0);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const selectTerminal = idx => {
    if (selected !== idx && idx !== 2) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setSelected(idx === selected ? -1 : idx);
    }
  };

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.amount}>
        <IText style={{color: '#fabd42'}}>
          {t('wallet.available_balance')}
        </IText>
        <IText
          lines={1}
          adjustsFontSizeToFit
          regular
          style={{
            color: colors.keyPad.label,
            fontSize: 150,
          }}
        >
          {formatter.format(28600).replace('$', '')}
        </IText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {buttons.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: item.color,
                padding: 5,
                borderRadius: 44,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectTerminal(idx);
                }}
                style={{
                  width: selected === idx ? 50 : 40,
                  height: 50,
                  borderRadius: 50 / 2,
                  backgroundColor: '#FFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FIcon
                  name={item.icon}
                  size={25}
                  style={{color: item.color}}
                  // style={{color: colors.menu.bottom.icon}}
                />
              </TouchableOpacity>
              <IText
                medium
                style={{
                  color: colors.text.primary,
                  marginHorizontal: selected === idx ? 10 : 0,
                }}
              >
                {selected === idx ? item.label : ''}
              </IText>
            </View>
          );
        })}
      </View>
      {/* {terminals.map((item, idx) => {
        return (
          <TerminalCard
            key={idx}
            isExpanded={idx === selected}
            onPress={() => {
              selectTerminal(idx);
            }}
            onPressStatement={() => {
              console.log('haha');
            }}
          />
        );
      })} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  amount: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default InitScreen;
