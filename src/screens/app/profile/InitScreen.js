import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, signout, test} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.darkModeContainer}>
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
              style={[{color: colors.darkMode.label}, styles.darkModeIcon]}
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
              style={[{color: colors.darkMode.label}, styles.darkModeIcon]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkModeContainer: {
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
});

export default InitScreen;
