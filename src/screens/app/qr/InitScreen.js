import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import PrimaryButton from '../../../components/PrimaryButton';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, setLoading} = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
      label: '00',
      value: '00',
    },
    {
      label: '0',
      value: 0,
    },
    {
      label: '<',
      value: '<',
    },
  ]);

  const calculateAmount = item => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (item.value !== '<') {
      if (item.value === 0 && (amount * 10).toString().length < 8)
        setAmount(amount * 10);
      else if (item.value === '00' && (amount * 100).toString().length < 8)
        setAmount(amount * 100);
      else if ((amount * 10 + item.value).toString().length < 8)
        setAmount(amount * 10 + item.value);
    } else {
      let lastDigit = amount
        .toString()
        .substr(amount.toString().length - 1, amount.toString().length);
      setAmount((amount - lastDigit) / 10);
    }
  };

  const reset = item => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (item.value === '<') setAmount(0);
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keyPadContainer}>
        <View style={styles.amount}>
          <IText
            lines={1}
            adjustsFontSizeToFit
            regular
            style={{
              color: colors.keyPad.label,
              fontSize: 150,
            }}
          >
            {formatter.format(amount).replace('$', '₮')}
          </IText>
        </View>
        <View
          style={[{backgroundColor: colors.keyPad.background}, styles.keyPad]}
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
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => calculateAmount(item)}
                onLongPress={() => reset(item)}
                style={[
                  {
                    width: width / 3 - 30,
                    height: width / 3 - 50,
                    backgroundColor: colors.keyPad.key,
                  },
                  styles.key,
                ]}
              >
                {item.label !== '<' ? (
                  <IText
                    regular
                    style={{color: colors.keyPad.label, fontSize: 24}}
                  >
                    {item.label}
                  </IText>
                ) : (
                  <Icon
                    name={'backspace-outline'}
                    size={25}
                    style={{
                      color: colors.keyPad.label,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
          <PrimaryButton
            onPress={() => {
              setLoading(true);
              setShow(true);
            }}
            label={t('payment.create_invoice')}
          />
        </View>
      </View>

      <Modal
        isVisible={show}
        backdropOpacity={0.1}
        onBackdropPress={() => {
          setShow(!show);
          setLoading(false);
        }}
      >
        <View style={styles.modal}>
          <View
            style={[
              {backgroundColor: colors.background.primary},
              styles.modalContainer,
            ]}
          >
            <IText
              lines={1}
              adjustsFontSizeToFit
              regular
              style={{
                color: colors.keyPad.label,
                fontSize: 150,
                marginBottom: 20,
              }}
            >
              {formatter.format(amount).replace('$', '₮')}
            </IText>

            <QRCode
              value={'HAHAHAHA'}
              size={width / 2}
              color={colors.qr}
              backgroundColor="transparent"
            />

            <PrimaryButton
              style={{marginTop: 20, width: width / 2}}
              onPress={() => {
                setLoading(false);
                setShow(!show);
                setAmount(0);
              }}
              label={t('common.close')}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyPadContainer: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    left: 1,
  },
  amount: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-end',
  },
  keyPad: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  key: {
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'center',
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default InitScreen;
