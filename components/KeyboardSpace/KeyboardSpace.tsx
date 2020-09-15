// KeyboardSpace.js
// from https://github.com/Andr3wHur5t/react-native-keyboard-spacer

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform,KeyboardEventName, View, Keyboard, LayoutAnimation} from 'react-native';

interface KeyboardSpaceProps{
  topInsets: number;
}
interface keyboardHeightState{
  keyboardHeight: number;
}
export default class KeyboardSpace extends Component<KeyboardSpaceProps,keyboardHeightState> {
  static defaultProps = {
    topInsets: 0,
  };
  private showListener: any;
  private hideListener: any;
  constructor(props:KeyboardSpaceProps) {
    super(props);
    this.showListener = null;
    this.hideListener = null;
    this.state = {
      keyboardHeight: 0,
    };
    this.onKeyboardShow = this.onKeyboardShow.bind(this);
    this.onKeyboardHide = this.onKeyboardHide.bind(this);
  }

  componentDidMount() {
    if (!this.showListener) {
      let name:KeyboardEventName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      this.showListener = Keyboard.addListener((name), this.onKeyboardShow);
    }
    if (!this.hideListener) {
      let name:KeyboardEventName = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
      this.hideListener = Keyboard.addListener(name,this.onKeyboardHide);
    }
  }

  componentWillUnmount() {
    if (this.showListener) {
      this.showListener.remove();
      this.showListener = null;
    }
    if (this.hideListener) {
      this.hideListener.remove();
      this.hideListener = null;
    }
  }

  componentDidUpdate(prevProps:KeyboardSpaceProps, prevState:keyboardHeightState) {
    if (prevState.keyboardHeight !== this.state.keyboardHeight) {
      LayoutAnimation.configureNext({
        duration: 500,
        create: {
          duration: 300,
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 200,
        }
      });
    }
  }

  onKeyboardShow(e:any) {
    if (!e || !e.endCoordinates || !e.endCoordinates.height) return;
    let height = e.endCoordinates.height + (this.props.topInsets ? this.props.topInsets : 0);
    this.setState({keyboardHeight: height});
  }

  onKeyboardHide() {
    this.setState({keyboardHeight: 0});
  }

  render() {
    return (
      <View style={[styles.keyboardSpace, {height: this.state.keyboardHeight}]} />
    );
  }

}

const styles = StyleSheet.create({
  keyboardSpace: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
