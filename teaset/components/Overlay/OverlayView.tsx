// OverlayView.js

'use strict';

import React, {Component} from "react";
import ReactNative, {StyleSheet, Animated,ViewProps, View, PanResponder, Platform, ViewStyle, PanResponderInstance} from 'react-native';

import Theme from '../../themes/Theme';
import KeyboardSpace from '../KeyboardSpace/KeyboardSpace';

interface OverlayViewProps extends ViewProps{
  style: ViewStyle;
  modal: boolean;
  animated: boolean;
  overlayOpacity: number;
  overlayPointerEvents?: "auto" | "none" | "box-none" | "box-only" | undefined;
  autoKeyboardInsets: boolean;
  closeOnHardwareBackPress: boolean; //android only
  onAppearCompleted: Function;
  onDisappearCompleted: Function;
  onCloseRequest: Function; //(overlayView)
}
interface OverlayViewState{
  overlayOpacity: any;
}
export default class OverlayView extends Component<OverlayViewProps,OverlayViewState> {
  static defaultProps = {
    modal: false,
    animated: false,
    overlayPointerEvents: 'auto',
    autoKeyboardInsets: false,
    closeOnHardwareBackPress: true,
  };
  private panResponder: PanResponderInstance;
  private touchStateID: any;
  private backListener: any;
  private closed: any;
  constructor(props:OverlayViewProps) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => this.touchStateID = gestureState.stateID,
      onPanResponderRelease: (e, gestureState) => this.touchStateID == gestureState.stateID ? this.closeRequest() : null,
    });
    this.state = {
      overlayOpacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.appearAfterMount && this.appear();
    if (Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.props.closeOnHardwareBackPress) {
          this.closeRequest();
          return true;          
        } else {
          return false;
        }
      });
    }
  }

  componentWillUnmount() {
    this.removeBackListener();
  }

  removeBackListener() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
  }

  get overlayOpacity() {
    let {overlayOpacity} = this.props;
    return (overlayOpacity || overlayOpacity === 0) ? overlayOpacity : Theme.overlayOpacity;
  }

  get appearAnimates() {
    let duration = 200;
    let animates = [
      Animated.timing(this.state.overlayOpacity, {
        toValue: this.overlayOpacity,
        duration,
        useNativeDriver: false,
      })
    ];
    return animates;
  }
  
  get disappearAnimates() {
    let duration = 200;
    let animates = [
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      })
    ];
    return animates;
  }

  get appearAfterMount() {
    return true;
  }

  get overlayPointerEvents() { //override in Toast
    return this.props.overlayPointerEvents;
  }

  appear(animated = this.props.animated, additionAnimates:any = null) {
    if (animated) {
      this.state.overlayOpacity.setValue(0);
      Animated.parallel(this.appearAnimates.concat(additionAnimates)).start(e => this.appearCompleted());
    } else {
      this.state.overlayOpacity.setValue(this.overlayOpacity);
      this.appearCompleted();
    }
  }

  disappear(animated = this.props.animated, additionAnimates:any = null) {
    if (animated) {
      Animated.parallel(this.disappearAnimates.concat(additionAnimates)).start(e => this.disappearCompleted());
      this.state.overlayOpacity.addListener((e:any) => {
        if (e.value < 0.01) {
          this.state.overlayOpacity.stopAnimation();
          this.state.overlayOpacity.removeAllListeners();
        }
      });
    } else {
      this.disappearCompleted();
    }
  }

  appearCompleted() {
    const {onAppearCompleted} = this.props;
    onAppearCompleted && onAppearCompleted();
  }

  disappearCompleted() {
    let {onDisappearCompleted} = this.props;    
    onDisappearCompleted && onDisappearCompleted();
  }

  close(animated = this.props.animated) {
    if (this.closed) return true;
    this.closed = true;
    this.removeBackListener();
    this.disappear(animated);
    return true;
  }

  closeRequest() {
    let {modal, onCloseRequest} = this.props;
    if (onCloseRequest) onCloseRequest(this);
    else if (!modal) this.close();
  }

  buildStyle() {
    let {style} = this.props;
    style = [{backgroundColor: 'rgba(0, 0, 0, 0)', flex: 1}].concat(style);
    return style;
  }

  renderContent() {
    return this.props.children;
  }

  render() {
    let {autoKeyboardInsets} = this.props;
    return (
      <View style={styles.screen} pointerEvents={this.overlayPointerEvents}>
        <Animated.View
          style={[styles.screen, {backgroundColor: '#000', opacity: this.state.overlayOpacity}]}
          {...this.panResponder.panHandlers}
          />
        <View style={this.buildStyle()} pointerEvents='box-none'>
          {this.renderContent()}
        </View>
        {autoKeyboardInsets ? <KeyboardSpace /> : null}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
