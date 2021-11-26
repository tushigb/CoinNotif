import React from 'react';
import {Text} from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

const IText = props => {
  const {colors} = useTheme();

  return (
    <Text
      numberOfLines={props.lines}
      adjustsFontSizeToFit={props.adjustsFontSizeToFit}
      style={[
        {
          fontFamily: props.black
            ? 'Rubik-Black'
            : props.blackItalic
            ? 'Rubik-BlackItalic'
            : props.bold
            ? 'Rubik-Bold'
            : props.boldItalic
            ? 'Rubik-BoldItalic'
            : props.extraBold
            ? 'Rubik-ExtraBold'
            : props.extraBoldItalic
            ? 'Rubik-ExtraBoldItalic'
            : props.italic
            ? 'Rubik-Italic'
            : props.light
            ? 'Rubik-Light'
            : props.lightItalic
            ? 'Rubik-LightItalic'
            : props.medium
            ? 'Rubik-Medium'
            : props.mediumItalic
            ? 'Rubik-MediumItalic'
            : props.semiBold
            ? 'Rubik-SemiBold'
            : props.semiBoldItalic
            ? 'Rubik-SemiBoldItalic'
            : 'Rubik-Regular',
          fontSize: 18,
          color: props.color ? props.color : colors.text.primary,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default IText;
