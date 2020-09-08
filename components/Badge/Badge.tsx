// Badge.js

'use strict';

import React, {Component} from 'react';
import {View, Text, TextStyle, ViewStyle, StyleSheet, ViewProps} from 'react-native';
import Theme from '../../themes/Theme';

interface BadgeProps extends ViewProps{
  type?: 'capsule' | 'square' | 'dot';
  count?: string | number;
  countStyle?: TextStyle;
  maxCount: number;
  style?: ViewStyle;
}

export default class Badge extends Component<BadgeProps> {
  static defaultProps = {
    type: 'capsule',
    maxCount: 99,
  };

  buildStyle() {
    const {style, type, count} = this.props;
    let width, height, minWidth, borderRadius, borderWidth, padding;
    switch (type) {
      case 'capsule':
        height = Theme.badgeSize;
        minWidth = Theme.badgeSize;
        borderRadius = Theme.badgeSize / 2;
        borderWidth = Theme.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : Theme.badgePadding;
        break;
      case 'square':
        height = Theme.badgeSize;
        minWidth = Theme.badgeSize;
        borderRadius = 2;
        borderWidth = Theme.badgeBorderWidth;
        padding = (count + '').length === 1 ? 0 : Theme.badgePadding;
        break;
      case 'dot':
        width = Theme.badgeDotSize;
        height = Theme.badgeDotSize;        
        borderRadius = Theme.badgeDotSize / 2;
        borderWidth = 0;
        padding = 0;
        break;
    }

    const styles = StyleSheet.create({
      baseStyle: {
        backgroundColor: Theme.badgeColor,
        width: width,
        height: height,
        minWidth: minWidth,
        borderRadius: borderRadius,
        borderColor: Theme.badgeBorderColor,
        borderWidth: borderWidth,
        paddingLeft: padding,
        paddingRight: padding,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }
    });
    return StyleSheet.flatten([styles.baseStyle,style]) ;
  }

  renderInner() {
    const {type, count, countStyle, maxCount, children} = this.props;
    if (type === 'dot') return null;
    else if (count || count === 0) {
      return (
        <Text style={StyleSheet.flatten([styles.countStyle,countStyle])} allowFontScaling={false} numberOfLines={1}>
          {count > maxCount ? maxCount + '+' : count}
        </Text>
      );
    } else {
      return children;
    }
  }

  render() {
    const {style, children, type, count, countStyle, maxCount, ...others} = this.props;
    return (
      <View style={this.buildStyle()} {...others}>
        {this.renderInner()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  countStyle: {
    color: Theme.badgeTextColor,
    fontSize: Theme.badgeFontSize,
  }
})