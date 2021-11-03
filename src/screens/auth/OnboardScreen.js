import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Platform,
  Dimensions,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {BarIndicator} from 'react-native-indicators';

import I18n from '../../utils/i18n';
import {useTheme} from '../../theme/ThemeProvider';
import {Context as AuthContext} from '../../context/AuthContext';

import IText from '../../components/IText';
import PrimaryButton from '../../components/PrimaryButton';

const OnboardScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const scrollRef = useRef();

  useEffect(() => {});

  const [page, setPage] = useState(1);

  const onPressTouch = forward => {
    scrollRef.current?.scrollTo({
      x: width * page,
      animated: true,
    });
    if (!forward) {
      setPage(page - 1);
    }
  };

  const handleScroll = e => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let num = Math.floor(contentOffset.x / viewSize.width);
    setPage(num + 1);
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar hidden />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login', {});
        }}
        style={styles.skipButton}>
        <IText medium>{t('onboard.skip')}</IText>
      </TouchableOpacity>
      <ScrollView
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollContainer}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: width,
          }}>
          <Image
            source={require('../../assets/images/onboard1.png')}
            style={{width: width, height: width}}
          />
          <View style={styles.textContainer}>
            <IText style={styles.title} medium>
              {t('onboard.title1')}
            </IText>
            <IText style={styles.description}>{t('onboard.text1')}</IText>
          </View>
        </View>
        <View
          style={{
            width: width,
          }}>
          <Image
            source={require('../../assets/images/onboard2.png')}
            style={{width: width, height: width}}
          />
          <View style={styles.textContainer}>
            <IText style={styles.title} medium>
              {t('onboard.title2')}
            </IText>
            <IText style={styles.description}>{t('onboard.text2')}</IText>
          </View>
        </View>
        <View
          style={{
            width: width,
          }}>
          <Image
            source={require('../../assets/images/onboard3.png')}
            style={{width: width, height: width}}
          />
          <View style={styles.textContainer}>
            <IText style={styles.title} medium>
              {t('onboard.title3')}
            </IText>
            <IText style={styles.description}>
              <IText style={styles.description}>{t('onboard.text3')}</IText>
            </IText>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={{width: width}} />

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            onPress={() => {
              onPressTouch(true);
            }}>
            <IText>asd</IText>
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
  scrollContainer: {
    marginTop: 20,
  },
  skipButton: {
    padding: 20,
    alignItems: 'flex-end',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
  },
  dot: {
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: '#000',
  },
});

export default OnboardScreen;
