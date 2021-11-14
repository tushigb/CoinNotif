import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import I18n from '../../utils/i18n';
import {useTheme} from '../../theme/ThemeProvider';

import IText from '../../components/IText';

const OnboardScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const scrollRef = useRef();

  useEffect(() => {});

  const [items, setItems] = useState([
    {
      image: require('../../assets/images/onboard1.png'),
      title: t('onboard.title1'),
      desc: t('onboard.text1'),
    },
    {
      image: require('../../assets/images/onboard2.png'),
      title: t('onboard.title2'),
      desc: t('onboard.text2'),
    },
    {
      image: require('../../assets/images/onboard3.png'),
      title: t('onboard.title3'),
      desc: t('onboard.text3'),
    },
  ]);
  const [page, setPage] = useState(1);

  const onPressTouch = forward => {
    if (page !== 3) {
      scrollRef.current?.scrollTo({
        x: width * page,
        animated: true,
      });
    } else {
      navigation.navigate('Login', {});
    }

    if (!forward) {
      setPage(page - 1);
    }
  };

  const handleScroll = e => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
      <ScrollView
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollContainer}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, idx) => {
          return (
            <View
              style={{
                width: width,
              }}
            >
              <Image
                source={item.image}
                style={{width: width, height: width}}
              />
              <View style={styles.textContainer}>
                <IText style={styles.title} medium>
                  {item.title}
                </IText>
                <IText style={styles.description}>{item.desc}</IText>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.dotContainer}>
        {items.map((item, idx) => {
          return (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.text.primary,
                  width: page === idx + 1 ? 16 : 8,
                },
              ]}
            />
          );
        })}
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login', {});
            }}
            style={styles.skipButton}
          >
            <IText medium>{t('onboard.skip')}</IText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              onPressTouch(true);
            }}
          >
            <Icon
              name={'arrow-forward'}
              size={25}
              style={{
                padding: 10,
                color: colors.text.primary,
              }}
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
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});

export default OnboardScreen;
