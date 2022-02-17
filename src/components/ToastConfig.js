// App.jsx
import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import CustomToast from './CustomToast';

const toastConfig = {
  // success: props => (
  //   <BaseToast
  //     {...props}
  //     style={{borderLeftColor: '#34bf49'}}
  //     contentContainerStyle={{paddingHorizontal: 15}}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //       fontFamily: 'Rubik-Regular',
  //     }}
  //   />
  // ),

  // error: props => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17,
  //       fontWeight: '400',
  //       fontFamily: 'Rubik-Regular',
  //     }}
  //     text2Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //       fontFamily: 'Rubik-Regular',
  //     }}
  //   />
  // ),

  success: ({text1, text2, props}) => (
    <CustomToast
      title={text1}
      label={text2}
      icon={props.icon ? props.icon : 'checkmark-circle-outline'}
      color="#34bf49"
      background={'rgba(52, 191, 73, 0.1)'}
    />
  ),
  info: ({text1, text2, props}) => (
    <CustomToast
      title={text1}
      label={text2}
      icon={props.icon ? props.icon : 'information-circle-outline'}
      color="#007ee5"
      background={'rgba(0, 126, 229, 0.1)'}
    />
  ),
  warning: ({text1, text2, props}) => (
    <CustomToast
      title={text1}
      label={text2}
      icon={props.icon ? props.icon : 'alert-circle-outline'}
      color="#fabd42"
      background={'rgba(250, 189, 66, 0.1)'}
    />
  ),
  error: ({text1, text2, props}) => (
    <CustomToast
      title={text1}
      label={text2}
      icon={props.icon ? props.icon : 'close-circle-outline'}
      color="#ff4c4c"
      background={'rgba(255, 76, 76, 0.1)'}
    />
  ),
};

export default toastConfig;
