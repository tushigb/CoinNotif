import React, {useState, useEffect, useContext, useReducer} from 'react';
import {
  StatusBar,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Skeleton} from 'moti/skeleton';
import {MotiView} from 'moti';
import {LinearGradient} from 'expo-linear-gradient';

import I18n from '../../../utils/i18n';
import {useTheme} from '../../../theme/ThemeProvider';
import {Context as AuthContext} from '../../../context/AuthContext';

import IText from '../../../components/IText';
import PrimaryButton from '../../../components/PrimaryButton';
import InvoiceTypeCard from '../../../components/InvoiceTypeCard';
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
  const [selected, setSelected] = useState(0);
  const [exchanges] = useState(['CHB', 'TRD', 'DAX']);
  const [coinhubAssets, setCoinhubAssets] = useState([]);
  const [tradeAssets, setTradeAssets] = useState([]);
  const [daxAssets, setDaxAssets] = useState([]);

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  const formatter = (num, decimals) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
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
          {exchanges.map((item, idx) => {
            return (
              <View style={{alignItems: 'center'}}>
                <InvoiceTypeCard
                  onPress={label => {
                    setSelected(idx);
                    ReactNativeHapticFeedback.trigger('impactLight', {
                      enableVibrateFallback: true,
                      ignoreAndroidSystemSettings: false,
                    });
                  }}
                  color={colors.darkMode.background}
                  icon="analytics"
                  label={'Coinhub'}
                  selected={idx === selected}
                />
                <IText style={{marginTop: 10}}>{item}</IText>
              </View>
            );
          })}
        </View>
      </View>
      <ScrollView
        style={{flex: 1}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          style={{flex: 1, paddingHorizontal: 20, marginTop: 10, width: width}}
          showsVerticalScrollIndicator={false}
        >
          <IText style={{marginTop: 10, fontSize: 24}}>Coinhub</IText>
          {coinhubAssets.map((item, idx) => {
            return (
              <CoinCard
                key={idx}
                onPress={() => {
                  // setLoading(true);
                  // setShow(true);
                }}
                name={item.market}
                change={formatter(item.change * 100)}
                price={item.close}
                volume={item.volume}
                high={item.high}
                low={item.low}
              />
            );
          })}
        </ScrollView>
        <ScrollView
          style={{flex: 1, paddingHorizontal: 20, marginTop: 10, width: width}}
          showsVerticalScrollIndicator={false}
        >
          <IText style={{marginTop: 10, fontSize: 24}}>Trade</IText>
          {tradeAssets.map((item, idx) => {
            return (
              item.lastPrice && (
                <CoinCard
                  key={idx}
                  // onPress={() => {
                  //   setLoading(true);
                  //   setShow(true);
                  // }}
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
        </ScrollView>
        <ScrollView
          style={{flex: 1, paddingHorizontal: 20, marginTop: 10, width: width}}
          showsVerticalScrollIndicator={false}
        >
          <IText style={{marginTop: 10, fontSize: 24}}>DAX</IText>
          {daxAssets.map((item, idx) => {
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
                  change={formatter(item.stats24.change24h)}
                  price={item.price.last_price / 100}
                  volume={item.volume}
                  high={item.high}
                  low={item.low}
                />
              )
            );
          })}
        </ScrollView>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
});

export default InitScreen;
