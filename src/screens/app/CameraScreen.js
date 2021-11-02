import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {utils} from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import {WebView} from 'react-native-webview';

import I18n from '../../utils/i18n';
import {useTheme} from '../../theme/ThemeProvider';
import {Context as AuthContext} from '../../context/AuthContext';

import IText from '../../components/IText';
import PrimaryButton from '../../components/PrimaryButton';

const CameraScreen = ({navigation}) => {
  const {t} = I18n;
  const {colors, setScheme, isDark} = useTheme();
  const {signin} = useContext(AuthContext);

  const [canDetectText] = useState(true);

  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');

  let cameraRef = useRef(null);

  _signIn = async () => {
    signin({});
  };

  takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 1, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const processed = await vision().cloudDocumentTextRecognizerProcessImage(
        data.uri,
      );
      let words = processed.text.split('\n');
      words.forEach(word => {
        if (
          word
            .replace(/ /g, '')
            .match(
              '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$',
            )
        ) {
          setCard(word);
        }
        if (word.replace(/ /g, '').includes('/')) {
          setExpiry(word);
        }
      });
    }
  };

  textRecognized = object => {
    if (object.textBlocks.length > 0) {
      object.textBlocks.forEach(block => {
        console.log(block.value);
        // if (
        //   block.value
        //     .replace(/ /g, '')
        //     .match(
        //       '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$',
        //     )
        // ) {
        //   console.log(block.value);
        // }
        // if (block.value.replace(/ /g, '').includes('/')) {
        //   console.log(block.value.split(' ')[1]);
        // }
      });
    }
  };

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <View style={[styles.container]}>
    //     <Pressable
    //       onPress={() => {
    //         console.log('Pressable');
    //       }}>
    //       <Text style={{color: '#000000'}}>Pressable</Text>
    //     </Pressable>
    //     <TouchableOpacity onPress={_signIn}>
    //       <Text style={{color: '#000000'}}>Login</Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <RNCamera
      ref={cameraRef}
      captureAudio={false}
      // trackingEnabled
      // onTextRecognized={textRecognized}
      style={[styles.container]}>
      <Text>{card}</Text>
      <Text>{expiry}</Text>
      <View
        style={{
          height: width - 150,
          borderWidth: 2,
          borderRadius: 25,
          borderColor: '#FFF',
          marginBottom: 20,
        }}
      />
      <PrimaryButton onPress={takePicture} label="Capture" />
      <PrimaryButton
        onPress={_signIn}
        label="Sign In"
        style={{marginTop: 10}}
      />
    </RNCamera>
    // <WebView
    //   source={{
    //     html: '<body><h1>Hello world</h1><button style="height:1000px; width:100px;" onclick="haha()">haha</button><script>function haha() {window.location.href= "socialpay-payment://key="}</script></body>',
    //   }}
    // />9
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
});

export default CameraScreen;
