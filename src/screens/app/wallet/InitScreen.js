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

import IText from '../../../components/IText';
import TerminalCard from '../../../components/TerminalCard';
import PrimaryButton from '../../../components/PrimaryButton';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  const [terminals, setTerminals] = useState([{}, {}, {}]);
  const [selected, setSelected] = useState(0);

  const selectTerminal = idx => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelected(idx === selected ? -1 : idx);
  };

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {terminals.map((item, idx) => {
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
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default InitScreen;
