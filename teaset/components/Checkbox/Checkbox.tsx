// Checkbox.js

'use strict';

import React, { Component, ReactElement } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextStyle,
  ImageStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

import Theme from '../../themes/Theme';

interface CheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  defaultChecked: boolean;
  size: 'lg' | 'md' | 'sm';
  title?: ReactElement | string | number;
  titleStyle?: TextStyle;
  checkedIcon?: ImageSourcePropType | ReactElement;
  checkedIconStyle?: ImageStyle;
  uncheckedIconStyle?: ImageStyle;
  uncheckedIcon?: ImageSourcePropType | ReactElement;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle;
  activeOpacity?: number;
  onPress?: Function;
}
interface CheckboxState {
  checked: boolean;
}
export default class Checkbox extends Component<CheckboxProps, CheckboxState> {

  static defaultProps = {
    defaultChecked: false,
    size: 'md',
    checkedIcon: require('../../icons/checked.png'),
    uncheckedIcon: require('../../icons/unchecked.png'),
    hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  };

  constructor(props: CheckboxProps) {
    super(props);
    const checked = props.checked === true || props.checked === false ? props.checked : props.defaultChecked;
    this.state = {
      ...this.state,
      checked: checked,
    };
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    const { checked } = this.props;
    if (checked === true || checked === false) {
      if (checked !== this.state.checked) {
        this.setState({ checked });
      }
    }
  }

  buildStyle = () => {
    const { disabled } = this.props;
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 1,
        ...this.props.style,
      }
    });
    if (disabled) {
      return StyleSheet.flatten([styles.container, { opacity: Theme.cbDisabledOpacity }]);
    }
    return styles.container;
  }

  renderIcon() {
    let { size, checkedIcon, uncheckedIcon, checkedIconStyle, uncheckedIconStyle } = this.props;
    let { checked } = this.state;

    let iconSize;
    switch (size) {
      case 'lg': iconSize = Theme.cbIconSizeLG; break;
      case 'sm': iconSize = Theme.cbIconSizeSM; break;
      default: iconSize = Theme.cbIconSizeMD;
    }

    let iconStyle = {
      tintColor: checked ? Theme.cbCheckedTintColor : Theme.cbUncheckedTintColor,
      width: iconSize,
      height: iconSize,
    }
    const styles = StyleSheet.flatten([iconStyle, checked ? checkedIconStyle : uncheckedIconStyle])
    if (!React.isValidElement(checkedIcon) && (checkedIcon || checkedIcon === 0)) {
      checkedIcon = <Image key='icon' style={styles} source={checkedIcon} />;
    }
    if (!React.isValidElement(uncheckedIcon) && (uncheckedIcon || uncheckedIcon === 0)) {
      uncheckedIcon = <Image key='icon' style={styles} source={uncheckedIcon} />;
    }

    return checked ? checkedIcon : uncheckedIcon;
  }

  renderTitle() {
    const { size, title, titleStyle } = this.props;
    let titleElement = title;
    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      let textFontSize, textPaddingLeft;
      switch (size) {
        case 'lg':
          textFontSize = Theme.cbFontSizeLG;
          textPaddingLeft = Theme.cbTitlePaddingLeftLG;
          break;
        case 'sm':
          textFontSize = Theme.cbFontSizeSM;
          textPaddingLeft = Theme.cbTitlePaddingLeftSM;
          break;
        default:
          textFontSize = Theme.cbFontSizeMD;
          textPaddingLeft = Theme.cbTitlePaddingLeftMD;
      }

      const styles = StyleSheet.create({
        textStyle: {
          color: Theme.cbTitleColor,
          fontSize: textFontSize,
          overflow: 'hidden',
          paddingLeft: textPaddingLeft,
          ...titleStyle,
        }
      });
      titleElement = (
        <Text key='title'
          style={styles.textStyle}
          numberOfLines={1}>
          {title}
        </Text>
      );
    }
    return titleElement;
  }

  render() {
    const { style, children, checked, defaultChecked, size, title, titleStyle, checkedIcon, checkedIconStyle, uncheckedIcon, uncheckedIconStyle, disabled, activeOpacity, onChange, onPress, ...others } = this.props;
    const styles = this.buildStyle();
    let $activeOpacity = activeOpacity;
    if (disabled) {
      $activeOpacity = styles.opacity;
    }
    return (
      <TouchableOpacity
        style={styles}
        disabled={disabled}
        activeOpacity={$activeOpacity}
        onPress={e => {
          this.setState({ checked: !checked });
          onChange && onChange(!checked);
          onPress && onPress(e);
        }}
        {...others}
      >
        {this.renderIcon()}
        {this.renderTitle()}
      </TouchableOpacity>
    );
  }
}
