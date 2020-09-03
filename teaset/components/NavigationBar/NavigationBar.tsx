// NavigationBar.js

'use strict';

import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, StatusBar, Animated, Dimensions, TextStyle, ViewProps, LayoutChangeEvent, ViewStyle } from 'react-native';

import Theme from '../../themes/Theme';
import NavigationTitle from './NavigationTitle';
import NavigationButton from './NavigationButton';
import NavigationLinkButton from './NavigationLinkButton';
import NavigationIconButton from './NavigationIconButton';
import NavigationBackButton from './NavigationBackButton';

interface NavigationBarProps extends ViewProps {
  type: 'auto' | 'ios' | 'android';
  title?: string | ReactElement;
  titleStyle?: TextStyle;
  leftView?: ReactElement;
  rightView?: ReactElement;
  tintColor?: string;//bar tint color, default tint color leftView and rightView, set to null for no tint color
  background?: ReactElement;
  hidden?: boolean; //bar hidden
  animated?: boolean; //hide or show bar with animation
  statusBarStyle?: 'default' | 'light-content' | 'dark-content'; //status bar style (iOS only)
  statusBarColor?: string, //status bar color, default: style.backgroundColor
  statusBarHidden?: boolean, //status bar hidden
  statusBarInsets?: boolean, //auto add space for iOS status bar
}
interface NavigationBarState {
  leftViewWidth: number;
  rightViewWidth: number;
  barTop: any;
  barOpacity: any;
}
export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
  static defaultProps = {
    type: 'ios',
    hidden: false,
    animated: true,
    statusBarInsets: true,
  };

  static childContextTypes = {
    tintColor: PropTypes.string,
  };
  static Button = NavigationButton;
  static LinkButton = NavigationLinkButton;
  static IconButton = NavigationIconButton;
  static BackButton = NavigationBackButton;
  private screenWidth: number;
  private barHeight: number;
  constructor(props: NavigationBarProps) {
    super(props);
    this.screenWidth = Dimensions.get('window').width;
    this.state = {
      leftViewWidth: 0,
      rightViewWidth: 0,
      barTop: new Animated.Value(props.hidden ? -(Theme.navBarContentHeight + Theme.statusBarHeight) : 0),
      barOpacity: new Animated.Value(props.hidden ? 0 : 1),
    };
    this.barHeight = 0;
  }

  componentDidUpdate(prevProps: NavigationBarProps) {
    if (prevProps.hidden != this.props.hidden) {
      this.checkBarHidden();
    }
  }

  getChildContext() {
    return { tintColor: this.props.tintColor === undefined ? Theme.navTintColor : this.props.tintColor };
  }

  buildStyle() {
    const { style, type, statusBarInsets } = this.props;
    let justifyContent;
    switch (type === 'auto' ? Platform.OS : type) {
      case 'ios': justifyContent = 'space-between'; break;
      case 'android': justifyContent = 'flex-end'; break;
    }
    let { left: leftInset, right: rightInset } = Theme.screenInset;
    const styles:ViewStyle = {
      backgroundColor: Theme.navColor,
      position: 'absolute',
      left: 0,
      right: 0,
      height: Theme.navBarContentHeight + (statusBarInsets ? Theme.statusBarHeight : 0),
      paddingTop: statusBarInsets ? Theme.statusBarHeight : 0,
      paddingLeft: 4 + leftInset,
      paddingRight: 4 + rightInset,
      borderBottomWidth: Theme.navSeparatorLineWidth,
      borderBottomColor: Theme.navSeparatorColor,
      flexDirection: 'row',
      alignItems: 'center',
    };
    
    return StyleSheet.flatten([
      styles,
      style,
      { justifyContent: justifyContent } as ViewStyle,
      //hidden or shown
      { top: this.state.barTop } as ViewStyle,
    ]);
  }

  checkBarHidden() {
    let { hidden, animated } = this.props;
    let { barTop, barOpacity } = this.state;
    let barTopValue = hidden ? -this.barHeight : 0;
    let barOpacityValue = hidden ? 0 : 1;
    if (barTop._value != barTopValue || barOpacity._value != barOpacityValue) {
      if (animated) {
        Animated.parallel([
          Animated.spring(barTop, { toValue: barTopValue, friction: 9, useNativeDriver: false, }),
          Animated.spring(barOpacity, { toValue: barOpacityValue, friction: 9, useNativeDriver: false, }),
        ]).start();
      } else {
        barTop.setValue(barTopValue);
        barOpacity.setValue(barOpacityValue);
      }
    }
  }

  onLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.height != this.barHeight) {
      this.barHeight = e.nativeEvent.layout.height;
      this.checkBarHidden();
    }
    let { width } = Dimensions.get('window');
    if (width != this.screenWidth) {
      this.screenWidth = width;
      this.forceUpdate();
    }
    this.props.onLayout && this.props.onLayout(e);
  }

  onLeftViewLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.width != this.state.leftViewWidth) {
      this.setState({ leftViewWidth: e.nativeEvent.layout.width });
    }
  }

  onRightViewLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.width != this.state.rightViewWidth) {
      this.setState({ rightViewWidth: e.nativeEvent.layout.width });
    }
  }

  renderStatusBar(fs: ViewStyle) {
    const { statusBarColor, statusBarStyle, statusBarHidden, statusBarInsets, animated } = this.props;
    let backgroundColor: any = statusBarColor;
    let barStyle = statusBarStyle;
    if (!statusBarColor) backgroundColor = statusBarInsets && (Platform.OS === 'ios' || Platform.Version > 20) ? 'rgba(0,0,0,0)' : fs.backgroundColor;
    if (!statusBarStyle) barStyle = Theme.navStatusBarStyle ? Theme.navStatusBarStyle : 'default';

    return (
      <StatusBar backgroundColor={backgroundColor} translucent={true} barStyle={barStyle} animated={animated} hidden={statusBarHidden} />
    );
  }

  renderBackground() {
    let backgroundViewStyle: ViewStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: this.state.barOpacity,
    };
    return <Animated.View style={backgroundViewStyle}>{this.props.background}</Animated.View>;
  }

  renderTitle(fs: ViewStyle) {
    let { type, title, titleStyle, statusBarInsets } = this.props;
    let { leftViewWidth, rightViewWidth } = this.state;

    let barPaddingLeft = fs.paddingLeft ? fs.paddingLeft : (fs.padding ? fs.padding : 0);
    let barPaddingRight = fs.paddingRight ? fs.paddingRight : (fs.padding ? fs.padding : 0);
    let paddingLeft, paddingRight;
    switch (type === 'auto' ? Platform.OS : type) {
      case 'ios':
        let paddingLeftRight = Math.max(leftViewWidth + Number(barPaddingLeft), rightViewWidth + Number(barPaddingRight));
        paddingLeft = paddingLeftRight;
        paddingRight = paddingLeftRight;
        break;
      case 'android':
        paddingLeft = barPaddingLeft;
        paddingRight = leftViewWidth + rightViewWidth + Number(barPaddingRight);
        break;
    }
    let titleViewStyle: ViewStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
      top: statusBarInsets ? Theme.statusBarHeight : 0,
      left: 0,
      right: 0,
      height: Theme.navBarContentHeight,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      opacity: this.state.barOpacity,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    //convert string title to NavigationBar.Title
    if (typeof title === 'string') {
      let textAlign;
      switch (type === 'auto' ? Platform.OS : type) {
        case 'ios': textAlign = 'center'; break;
        case 'android': textAlign = 'left'; break;
      }
      const styles = {
        textAlign,
        color: Theme.navTitleColor,
        ...titleStyle
      } as TextStyle;
      title = <NavigationTitle style={styles} text={title} />;
    }

    return <Animated.View style={titleViewStyle}>{title}</Animated.View>;
  }

  renderLeftView() {
    let { leftView } = this.props;
    let { barOpacity: opacity } = this.state;
    return <Animated.View style={{ opacity }} onLayout={this.onLeftViewLayout}>{leftView}</Animated.View>;
  }

  renderRightView() {
    let { rightView } = this.props;
    let { barOpacity: opacity } = this.state;
    return <Animated.View style={{ opacity }} onLayout={this.onRightViewLayout}>{rightView}</Animated.View>;
  }

  render() {
    let { style, children, type, title, titleStyle, leftView, rightView, tintColor, background, hidden, animated, statusBarStyle, statusBarColor, statusBarHidden, statusBarInsets, onLayout, ...others } = this.props;
    let fs:ViewStyle = this.buildStyle();
    return (
      <Animated.View style={fs} onLayout={this.onLayout} {...others}>
        {this.renderStatusBar(fs)}
        {this.renderBackground()}
        {this.renderTitle(fs)}
        {this.renderLeftView()}
        {this.renderRightView()}
      </Animated.View>
    );
  }
}
