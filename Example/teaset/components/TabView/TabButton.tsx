// TabButton.js

'use strict';

import React, {Component,ReactElement} from 'react';
import {View, Text, Image,ImageSourcePropType, TouchableOpacity,ViewStyle, TouchableOpacityProps, TextStyle, TouchableOpacityBase} from 'react-native';

import Theme from '../../themes/Theme';
import Badge from '../Badge/Badge';

interface TabButtonProps extends TouchableOpacityProps{
  title?: ReactElement | string | number;
  titleStyle?: TextStyle;
  activeTitleStyle?: TextStyle;
  icon?: ReactElement | ImageSourcePropType | number;
  activeIcon?: ReactElement | ImageSourcePropType | number;
  active?: boolean;
  iconContainerStyle?: ViewStyle;
  badge?: ReactElement | number;
  style?: ViewStyle;
}
export default class TabButton extends Component<TabButtonProps> {

  static defaultProps = {
    ...TouchableOpacityBase,
    active: false,
  };

  buildStyle() {
    const {style} = this.props;
    const styles:ViewStyle = {
      width: Theme.tvBarBtnWidth,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    };
    return styles;
  }

  renderIcon() {
    const { activeIcon, active, badge } = this.props;
    let icon = this.props.icon;
    if (active && activeIcon !== null && activeIcon !== undefined) icon = activeIcon;
    if (icon === null || icon === undefined) return icon;

    if (!React.isValidElement(icon)) {
      let iconStyle = {
        width: Theme.tvBarBtnIconSize,
        height: Theme.tvBarBtnIconSize,
        tintColor: active ? Theme.tvBarBtnIconActiveTintColor : Theme.tvBarBtnIconTintColor,
      };
      icon = <Image style={iconStyle} source={icon} />;      
    }

    const iconContainerStyle:ViewStyle ={
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      ...this.props.iconContainerStyle,
    };

    return <View style={iconContainerStyle}>{icon}</View>;
  }

  renderTitle() {
    let {title, titleStyle, activeTitleStyle, active} = this.props;
    if (title === null || title === undefined || React.isValidElement(title)) return title;

    let textStyle:TextStyle;
    if (active) {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.tvBarBtnActiveTitleColor,
        fontSize: Theme.tvBarBtnActiveTextFontSize,
        ...titleStyle,
        ...activeTitleStyle
      };
    } else {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.tvBarBtnTitleColor,
        fontSize: Theme.tvBarBtnTextFontSize,
        ...titleStyle
      };
    }
    return <Text style={textStyle} numberOfLines={1}>{title}</Text>;
  }

  renderBadge() {
    let {badge} = this.props;
    if (!badge || React.isValidElement(badge)) return badge;

    const badgeStyle:ViewStyle = {
      position: 'absolute',
      right: 0,
      top: 0,
    };
    return <Badge style={badgeStyle} count={badge} />;
  }

  render() {
    const {style, children, title, titleStyle, activeTitleStyle, icon, activeIcon, active, iconContainerStyle, badge, ...others} = this.props;
    return (
      <TouchableOpacity style={this.buildStyle()} {...others}>
        {this.renderIcon()}
        {this.renderTitle()}
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

