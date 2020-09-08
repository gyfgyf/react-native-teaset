// Input.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, TextInput,ViewStyle,TextInputProps} from 'react-native';

import Theme from '../../themes/Theme';

interface InputProps extends TextInputProps{
  style?: ViewStyle;
  size: 'lg' | 'md' | 'sm';
  disabled: boolean;
  placeholderTextColor?: string;
  pointerEvents?: "none" | "box-none" | "box-only" | "auto" | undefined;
  opacity?: number;
}
export default class Input extends Component<InputProps> {
  static defaultProps = {
    size: 'md',
    disabled: false,
    underlineColorAndroid: 'rgba(0, 0, 0, 0)',
  };

  buildStyle() {
    const {style, size,disabled} = this.props;

    let borderRadius, fontSize, paddingVertical, paddingHorizontal, height;
    switch (size) {
      case 'lg':
        borderRadius = Theme.inputBorderRadiusLG;
        fontSize = Theme.inputFontSizeLG;
        paddingVertical = Theme.inputPaddingVerticalLG;
        paddingHorizontal = Theme.inputPaddingHorizontalLG;
        height = Theme.inputHeightLG;
        break;
      case 'sm':
        borderRadius = Theme.inputBorderRadiusSM;
        fontSize = Theme.inputFontSizeSM;
        paddingVertical = Theme.inputPaddingVerticalSM;
        paddingHorizontal = Theme.inputPaddingHorizontalSM;
        height = Theme.inputHeightSM;
        break;
      default:
        borderRadius = Theme.inputBorderRadiusMD;
        fontSize = Theme.inputFontSizeMD;
        paddingVertical = Theme.inputPaddingVerticalMD;
        paddingHorizontal = Theme.inputPaddingHorizontalMD;
        height = Theme.inputHeightMD;
    }
    const styles = StyleSheet.create({
      container: {
        backgroundColor: Theme.inputColor,
        color: Theme.inputTextColor,
        borderColor: Theme.inputBorderColor,
        borderWidth: Theme.inputBorderWidth,
        borderRadius: borderRadius,
        fontSize: fontSize,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        height: height,
        opacity:1,
        ...style
      }
    })
    if (disabled) {
      return StyleSheet.flatten([styles.container,{opacity:Theme.inputDisabledOpacity}])
    }
    return styles.container;
  }

  render() {
    const {style, size, disabled, placeholderTextColor, pointerEvents, opacity, ...others} = this.props;
    return (
      <TextInput
        style={this.buildStyle()}
        placeholderTextColor={placeholderTextColor || Theme.inputPlaceholderTextColor}
        pointerEvents={disabled ? 'none' : pointerEvents}
        {...others}
      />
    );
  }
}
