import React, {useState, useEffect, useContext} from 'react';
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
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import PrimaryButton from '../../../components/PrimaryButton';
import InvoiceTypeCard from '../../../components/InvoiceTypeCard';
import InvoiceCard from '../../../components/InvoiceCard';
import CoinCard from '../../../components/CoinCard';

import {
  fetchCounhubPairs,
  fetchTradePairs,
  fetchDaxPairs,
} from '../../../service/Service';

const InitScreen = ({navigation}) => {
  const {colors, setScheme, isDark} = useTheme();
  const {t} = I18n;
  const {state, setLoading} = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [type, setType] = useState('Coinhub');
  const [coinhubAssets, setCoinhubAssets] = useState([]);
  const [tradeAssets, setTradeAssets] = useState([]);
  const [daxAssets, setDaxAssets] = useState([]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    fetchCounhubPairs()
      .then(response => {
        let data = response.data;
        let arr = [];
        arr.push(data['ADA/MNT']);
        arr.push(data['ARDX/MNT']);
        arr.push(data['BNB/MNT']);
        arr.push(data['BTC/MNT']);
        arr.push(data['CHB/MNT']);
        arr.push(data['DOGE/MNT']);
        arr.push(data['ETH/MNT']);
        arr.push(data['FTM/MNT']);
        arr.push(data['IHC/MNT']);
        arr.push(data['LTC/MNT']);
        arr.push(data['LUNA/MNT']);
        arr.push(data['MANA/MNT']);
        arr.push(data['MATIC/MNT']);
        arr.push(data['PAXG/MNT']);
        arr.push(data['SHIB/MNT']);
        arr.push(data['SPC/MNT']);
        arr.push(data['USDT/MNT']);
        arr.push(data['XRP/MNT']);
        setCoinhubAssets(arr);
      })
      .catch(error => {});

    fetchTradePairs()
      .then(response => {
        setTradeAssets(response.pairName);
      })
      .catch(error => {});

    fetchDaxPairs()
      .then(response => {
        setDaxAssets(response.data.sys_pair);
      })
      .catch(error => {});
  }, []);

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
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <View style={{alignItems: 'center'}}>
            <InvoiceTypeCard
              onPress={label => {
                setType(label);
                ReactNativeHapticFeedback.trigger('impactLight', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: false,
                });
              }}
              color={'#081628'}
              icon="analytics"
              label={'Coinhub'}
            />
            <IText style={{marginTop: 10}}>CHB</IText>
          </View>
          <View style={{alignItems: 'center'}}>
            <InvoiceTypeCard
              onPress={label => {
                setType(label);
                ReactNativeHapticFeedback.trigger('impactLight', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: false,
                });
              }}
              color={'#25d56f'}
              icon="analytics"
              label={'Trade'}
            />
            <IText style={{marginTop: 10}}>TRD</IText>
          </View>
          <View style={{alignItems: 'center'}}>
            <InvoiceTypeCard
              onPress={label => {
                setType(label);
                ReactNativeHapticFeedback.trigger('impactLight', {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: false,
                });
              }}
              color={'#181a20'}
              icon="analytics"
              label={'DAX'}
            />
            <IText style={{marginTop: 10}}>DAX</IText>
          </View>
          {/* <InvoiceTypeCard
            onPress={label => {
              setType(label);
            }}
            color={colors.invoiceType.canceled}
            icon="close"
            label={'Complex'}
          /> */}
        </View>
      </View>

      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <IText style={{marginTop: 10, fontSize: 24}}>{type}</IText>
        {type === 'Coinhub' &&
          coinhubAssets.map((item, idx) => {
            return (
              <CoinCard
                key={idx}
                onPress={() => {
                  // setLoading(true);
                  // setShow(true);
                }}
                name={item.market}
                change={item.change}
                price={item.open}
                volume={item.volume}
                high={item.high}
                low={item.low}
              />
            );
          })}
        {type === 'Trade' &&
          tradeAssets.map((item, idx) => {
            return (
              item.lastPrice !== null && (
                <CoinCard
                  key={idx}
                  onPress={() => {
                    // setLoading(true);
                    // setShow(true);
                  }}
                  name={item.name}
                  fullname={item.nameC}
                  change={item.diff}
                  price={item.lastPrice}
                  volume={item.volume}
                  high={item.high}
                  low={item.low}
                />
              )
            );
          })}
        {type === 'DAX' &&
          daxAssets.map((item, idx) => {
            return (
              item.lastPrice !== null && (
                <CoinCard
                  key={idx}
                  onPress={() => {
                    // setLoading(true);
                    // setShow(true);
                  }}
                  name={item.baseAsset.code + '/' + item.quoteAsset.code}
                  fullname={item.baseAsset.name}
                  change={item.stats24.change24h}
                  price={item.price.last_price / 100}
                  volume={item.volume}
                  high={item.high}
                  low={item.low}
                />
              )
            );
          })}
      </ScrollView>
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
