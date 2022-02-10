import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import IText from './IText';

import {useTheme} from '../theme/ThemeProvider';

const WarningAlert = props => {
  const {colors} = useTheme();

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

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <View
      style={[{backgroundColor: colors.loginKeyPad.background}, styles.keyPad]}
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
                ReactNativeHapticFeedback.trigger('impactLight', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: false,
                });
                props.keyOnPress(item);
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
  );
};

const styles = StyleSheet.create({});

export default WarningAlert;
