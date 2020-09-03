// NavigationTitle.js

'use strict';

import React, { Component } from 'react';
import { Text, TextStyle, TextBase, TextProps } from 'react-native';
import Theme from '../../themes/Theme';

interface NavigationTitleProps extends TextProps {
  text?: string | number;
  style?: TextStyle;
  tintColor?: string;
}
export default class NavigationTitle extends Component<NavigationTitleProps> {
  static defaultProps = {
    ...TextBase,
    numberOfLines: 1,
    allowFontScaling: false,
  };
  render() {
    const { style, text, children, ...others } = this.props;
    const styles:TextStyle = {
      flex: 1,
      paddingLeft: 4,
      paddingRight: 4,
      textAlign: 'center',
      overflow: 'hidden',
      color: this.context.tintColor,
      fontSize: Theme.navTitleFontSize,
      ...style,
    };
    return (
      <Text style={styles} {...others}>
        {(text === null || text === undefined) ? children : text}
      </Text>
    );
  }

}
