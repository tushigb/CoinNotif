import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';

import {BlurView, VibrancyView} from '@react-native-community/blur';
import {BallIndicator} from 'react-native-indicators';

import {useTheme} from '../theme/ThemeProvider';

const Loader = props => {
  const {colors} = useTheme();

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    <BlurView
      style={[styles.container]}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="#FFFFFF"
    >
      {/* <View style={styles.indicator}>
                {Platform.OS === 'ios' ? <BallIndicator size={50} color={colors.primary} /> : null}
            </View> */}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Loader;
