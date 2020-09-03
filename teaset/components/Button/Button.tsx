// Button.js

'use strict';
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Theme from '../../themes/Theme';

interface ButtonProps {
  type: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  title?: React.ReactElement | string | number;
  titleStyle?: TextStyle;
  disabled?: boolean;
  style?: ViewStyle;
  activeOpacity?: number;
}
export default class Button extends PureComponent<ButtonProps, {}> {

  static defaultProps = {
    type: 'default',
    size: 'md',
  };
  private touchableOpacityRef:any
  measureInWindow(callback:Function) {
    this.touchableOpacityRef && this.touchableOpacityRef.measureInWindow(callback);
  }
  measure(callback:Function) {
    this.touchableOpacityRef && this.touchableOpacityRef.measure(callback);
  }

  buildStyle() {
    const { style, type, size, disabled } = this.props;
    let backgroundColor, borderColor, borderWidth, borderRadius, paddingVertical, paddingHorizontal;
    switch (type) {
      case 'primary':
        backgroundColor = Theme.btnPrimaryColor;
        borderColor = Theme.btnPrimaryBorderColor;
        break;
      case 'secondary':
        backgroundColor = Theme.btnSecondaryColor;
        borderColor = Theme.btnSecondaryBorderColor;
        break;
      case 'danger':
        backgroundColor = Theme.btnDangerColor;
        borderColor = Theme.btnDangerBorderColor;
        break;
      case 'link':
        backgroundColor = Theme.btnLinkColor;
        borderColor = Theme.btnLinkBorderColor;
        break;
      default:
        backgroundColor = Theme.btnColor;
        borderColor = Theme.btnBorderColor;
    }
    switch (size) {
      case 'xl':
        borderRadius = Theme.btnBorderRadiusXL;
        paddingVertical = Theme.btnPaddingVerticalXL;
        paddingHorizontal = Theme.btnPaddingHorizontalXL;
        break;
      case 'lg':
        borderRadius = Theme.btnBorderRadiusLG;
        paddingVertical = Theme.btnPaddingVerticalLG;
        paddingHorizontal = Theme.btnPaddingHorizontalLG;
        break;
      case 'sm':
        borderRadius = Theme.btnBorderRadiusSM;
        paddingVertical = Theme.btnPaddingVerticalSM;
        paddingHorizontal = Theme.btnPaddingHorizontalSM;
        break;
      case 'xs':
        borderRadius = Theme.btnBorderRadiusXS;
        paddingVertical = Theme.btnPaddingVerticalXS;
        paddingHorizontal = Theme.btnPaddingHorizontalXS;
        break;
      default:
        borderRadius = Theme.btnBorderRadiusMD;
        paddingVertical = Theme.btnPaddingVerticalMD;
        paddingHorizontal = Theme.btnPaddingHorizontalMD;
    }
    borderWidth = Theme.btnBorderWidth;

    let styles = StyleSheet.create({
      container: {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        ...style
      }
    })
    if (disabled) {
      return StyleSheet.flatten([styles.container,{opacity:Theme.btnDisabledOpacity}]);
    }

    return styles.container;
  }

  renderTitle=()=> {
    const { type, size, title, titleStyle, children } = this.props;
    let titleElement = title;
    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      let textColor, textFontSize;
      switch (type) {
        case 'primary': textColor = Theme.btnPrimaryTitleColor; break;
        case 'secondary': textColor = Theme.btnSecondaryTitleColor; break;
        case 'danger': textColor = Theme.btnDangerTitleColor; break;
        case 'link': textColor = Theme.btnLinkTitleColor; break;
        default: textColor = Theme.btnTitleColor;
      }
      switch (size) {
        case 'xl': textFontSize = Theme.btnFontSizeXL; break;
        case 'lg': textFontSize = Theme.btnFontSizeLG; break;
        case 'sm': textFontSize = Theme.btnFontSizeSM; break;
        case 'xs': textFontSize = Theme.btnFontSizeXS; break;
        default: textFontSize = Theme.btnFontSizeMD;
      }
      const styles = StyleSheet.create({
        text: {
          color: textColor,
          fontSize: textFontSize,
          overflow: 'hidden',
         }
      })
      const style = StyleSheet.flatten([styles.text, titleStyle]);
      titleElement = <Text style={style} numberOfLines={1}>{title}</Text>;
    }

    return title ? titleElement : children;
  }

  render() {
    const {style, type, size, title, titleStyle, disabled, activeOpacity, children, ...others } = this.props;
    const styles = this.buildStyle();
    return (
      <TouchableOpacity
        style={styles}
        disabled={disabled}
        activeOpacity={disabled ? styles.opacity : activeOpacity}
        {...others}
        ref={ref=>(this.touchableOpacityRef=ref)}
      >
        {this.renderTitle()}
      </TouchableOpacity>
    );
  }
}
