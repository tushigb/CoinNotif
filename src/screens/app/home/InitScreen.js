import React, {useState, useContext} from 'react';
import {
  StatusBar,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import PrimaryButton from '../../../components/PrimaryButton';
import InvoiceTypeCard from '../../../components/InvoiceTypeCard';
import InvoiceCard from '../../../components/InvoiceCard';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, setLoading} = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [type, setType] = useState(t('invoice.success'));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <>
      <View
        style={{
          backgroundColor: colors.background.primary,
          padding: 20,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <View style={{alignItems: 'center'}}>
          <IText color="#A3A5BA">{t('payment.total_balance')}</IText>
          <IText style={{fontSize: 30, marginTop: 10}}>
            {formatter.format(10000).replace('$', '₮')}
          </IText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 20,
          }}>
          <InvoiceTypeCard
            onPress={label => {
              setType(label);
            }}
            color={colors.invoiceType.success}
            icon="checkmark-outline"
            label={t('invoice.success')}
          />
          <InvoiceTypeCard
            onPress={label => {
              setType(label);
            }}
            color={colors.invoiceType.pending}
            icon="repeat"
            label={t('invoice.pending')}
          />
          <InvoiceTypeCard
            onPress={label => {
              setType(label);
            }}
            color={colors.invoiceType.settlemented}
            icon="sync"
            label={t('invoice.settlemented')}
          />
          <InvoiceTypeCard
            onPress={label => {
              setType(label);
            }}
            color={colors.invoiceType.canceled}
            icon="close"
            label={t('invoice.canceled')}
          />
        </View>
      </View>
      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <IText style={{marginTop: 10, fontSize: 24}}>{type}</IText>
        <InvoiceCard
          onPress={() => {
            setLoading(true);
            setShow(true);
          }}
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
        <InvoiceCard
          label={type}
          amount={formatter.format(10000).replace('$', '₮')}
          invoiceNumber={'123123123123'}
        />
      </ScrollView>

      <Modal
        isVisible={show}
        backdropOpacity={0.1}
        onBackdropPress={() => {
          if (state.loading) setLoading(false);
          setShow(false);
        }}>
        <View style={styles.modal}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.invoiceType.success,
                position: 'absolute',
                top: -30,
                zIndex: 999,
              },
            ]}>
            <Icon
              name={'checkmark-outline'}
              size={25}
              style={{color: '#FFF'}}
            />
          </View>
          <View
            style={[
              {backgroundColor: colors.background.primary},
              styles.modalContainer,
            ]}>
            <IText
              lines={1}
              adjustsFontSizeToFit
              regular
              style={{
                color: colors.keyPad.label,
                fontSize: 40,
                marginTop: 20,
                textAlign: 'center',
              }}>
              {formatter.format(10000).replace('$', '₮')}
            </IText>

            <View style={[styles.row]}>
              <IText light color={colors.text.gray}>
                {t('payment.invoice_number')}
              </IText>
              <IText light color={colors.text.gray}>
                123123123123
              </IText>
            </View>
            <View style={[styles.row]}>
              <IText light color={colors.text.gray}>
                {t('payment.card_number')}
              </IText>
              <IText light color={colors.text.gray}>
                4444********4444
              </IText>
            </View>

            <PrimaryButton
              style={{marginTop: 20, width: width - 100}}
              onPress={() => {
                if (state.loading) setLoading(false);
                setShow(false);
              }}
              label={t('common.close')}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    padding: 20,
    // alignItems: 'center',
    borderRadius: 10,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default InitScreen;
