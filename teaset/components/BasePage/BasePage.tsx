// BasePage.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Platform, View, ViewProps, StyleSheet} from 'react-native';

import Theme from '../../themes/Theme';
import TeaNavigator from '../TeaNavigator/TeaNavigator';
import KeyboardSpace from '../KeyboardSpace/KeyboardSpace';

interface BasePageProps extends ViewProps{
  scene: object;//转场效果
  autoKeyboardInsets: boolean; //自动插入键盘占用空间;
  keyboardTopInsets: number;//插入键盘占用空间顶部偏移，用于底部有固定占用空间(如TabNavigator)的页面
}
export default class BasePage extends Component<BasePageProps> {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.Replace,
    autoKeyboardInsets: Platform.OS === 'ios',
    keyboardTopInsets: 0,
  };

  static contextTypes = {
    navigator: PropTypes.func,
  };
  private didMount: boolean;
  private isFocused: boolean;
  private backListener: any;
  constructor(props:BasePageProps) {
    super(props);
    this.didMount = false; //代替被废弃的isMounted
    this.isFocused = false; //this.state.isFocused move to this.isFocused
    this.state = {
    };
  }

  componentDidMount() {
    this.didMount = true;
    if (!this.backListener && Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => this.onHardwareBackPress());
    }
  }

  componentWillUnmount() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
    this.didMount = false;
  }

  get navigator() {
    if (!this.context.navigator) {
      console.error('The root component is NOT TeaNavigator, then you can not use BasePage.navigator.');
      return null;
    }
    return this.context.navigator();
  }

  //Call after the scene transition by Navigator.onDidFocus
  onDidFocus() {
    this.isFocused = true;
  }

  //Call before the scene transition by Navigator.onWillFocus
  onWillFocus() {
  }

  //Android hardware back key handler, default is pop to prev page
  onHardwareBackPress() {
    if (!this.context.navigator) return false;
    let navigator = this.context.navigator();
    if (!navigator) return false;
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  buildStyle() {
    const {style} = this.props;
    return StyleSheet.flatten([styles.base, style]);
  }
   
  renderPage() {
    // return null  ;
  }

  render() {
    let {style, children, scene, autoKeyboardInsets, keyboardTopInsets, ...others} = this.props;
    return (
      <View style={this.buildStyle()} {...others}>
        {this.renderPage()}
        {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets} /> : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: Theme.pageColor,
  }
})