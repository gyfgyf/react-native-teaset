// Wheel.js

'use strict';

import React, { Component } from "react";
import { PanResponderInstance,GestureResponderEvent, View, Text, Animated, PanResponder, ViewProps, TextStyle, ViewStyle, ViewBase, LayoutChangeEvent } from 'react-native';

import Theme from '../../themes/Theme';
import WheelItem from './WheelItem';

interface WheelProps extends ViewProps{
  items: any[];
  itemStyle: TextStyle;
  holeStyle: ViewStyle; //height is required
  maskStyle: ViewStyle;
  holeLine?: any;
  index: number;
  defaultIndex: number;
  style?: ViewStyle;
  onChange: (index: number)=>void; //(index)
}
export default class Wheel extends Component<WheelProps> {

  static defaultProps = {
    ...ViewBase,
    pointerEvents: 'box-only',
    defaultIndex: 0,
  };
  static Item = WheelItem;
  static preRenderCount=10;
  private panResponder: PanResponderInstance;
  private prevTouches:any[];
  private index:number;
  private lastRenderIndex:number;
  private height:number;
  private holeHeight:number;
  private hiddenOffset:number;
  private currentPosition:any;
  private targetPositionValue: any;
  private positionListenerId: any;
  private speed: any;
  constructor(props:WheelProps) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => true,
      onStartShouldSetPanResponderCapture: (e) => false,
      onMoveShouldSetPanResponder: (e) => true,
      onMoveShouldSetPanResponderCapture: (e) => false,
      onPanResponderGrant: (e) => this.onPanResponderGrant(e),
      onPanResponderMove: (e) => this.onPanResponderMove(e),
      onPanResponderTerminationRequest: (e) => true,
      onPanResponderRelease: (e) => this.onPanResponderRelease(e),
      onPanResponderTerminate: (e) => null,
      onShouldBlockNativeResponder: (e) => true,
    });
    this.prevTouches = [];
    this.index = props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.lastRenderIndex = this.index;
    this.height = 0;
    this.holeHeight = 0;
    this.hiddenOffset = 0;
    this.currentPosition = new Animated.Value(0);
    this.targetPositionValue = null;
  
    this.onLayout = this.onLayout.bind(this);
    this.onHoleLayout = this.onHoleLayout.bind(this);

    this.renderItem = this.renderItem.bind(this);
    this.renderMask = this.renderMask.bind(this);
    this.renderHoleLine = this.renderHoleLine.bind(this);
    this.renderHole = this.renderHole.bind(this);
  }

  componentDidMount() {
    if (!this.positionListenerId) {
      this.positionListenerId = this.currentPosition.addListener(e => this.handlePositionChange(e.value));
    }
  }

  componentWillUnmount() {
    if (this.positionListenerId) {
      this.currentPosition.removeListener(this.positionListenerId);
      this.positionListenerId = null;
    }
  }

  componentDidUpdate(prevProps:WheelProps) {
    if (this.props.index || this.props.index === 0) {
      this.currentPosition.setValue(this.props.index * this.holeHeight);
    }
  }

  onPanResponderGrant(e:GestureResponderEvent) {
    this.currentPosition.stopAnimation();
    this.prevTouches = e.nativeEvent.touches;
    this.speed = 0;
  }

  onPanResponderMove(e:GestureResponderEvent) {
    let { touches } = e.nativeEvent;
    let prevTouches = this.prevTouches;
    this.prevTouches = touches;

    if (touches.length != 1 || touches[0].identifier != prevTouches[0].identifier) {
      return;
    }

    let dy = touches[0].pageY - prevTouches[0].pageY;
    let pos = this.currentPosition._value - dy;
    this.currentPosition.setValue(pos);

    let t = touches[0].timestamp - prevTouches[0].timestamp;
    if (t) this.speed = dy / t;
  }

  onPanResponderRelease(e:GestureResponderEvent) {
    this.prevTouches = [];
    if (Math.abs(this.speed) > 0.1) this.handleSwipeScroll();
    else this.handleStopScroll();
  }

  handlePositionChange(value:number) {
    let newIndex = Math.round(value / this.holeHeight);
    if (newIndex != this.index && newIndex >= 0 && newIndex < this.props.items.length) {
      let moveCount = Math.abs(newIndex - this.lastRenderIndex);
      this.index = newIndex;
      if (moveCount > Wheel.preRenderCount) {
        this.forceUpdate();
      }
    }

    // let the animation stop faster
    if (this.targetPositionValue != null && Math.abs(this.targetPositionValue - value) <= 2) {
      this.targetPositionValue = null;
      this.currentPosition.stopAnimation();
    }
  }

  handleSwipeScroll() {
    let { items } = this.props;

    let inertiaPos = this.currentPosition._value - this.speed * 300;
    let newIndex = Math.round(inertiaPos / this.holeHeight);
    if (newIndex < 0) newIndex = 0;
    else if (newIndex > items.length - 1) newIndex = items.length - 1;

    let toValue = newIndex * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue: toValue,
      friction: 9,
      useNativeDriver: false,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(newIndex);
    });
  }

  handleStopScroll() {
    let toValue = this.index * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue: toValue,
      friction: 9,
      useNativeDriver: false,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(this.index);
    });
  }

  handleLayout(height:number, holeHeight:number) {
    this.height = height;
    this.holeHeight = holeHeight;
    if (holeHeight) {
      let maskHeight = (height - holeHeight) / 2;
      this.hiddenOffset = Math.ceil(maskHeight / holeHeight) + Wheel.preRenderCount;
    }
    this.forceUpdate(() => {
      this.currentPosition.setValue(this.index * holeHeight);
    });
  }

  onLayout(e:LayoutChangeEvent) {
    this.handleLayout(e.nativeEvent.layout.height, this.holeHeight);
    this.props.onLayout && this.props.onLayout(e);
  }

  onHoleLayout(e:LayoutChangeEvent) {
    this.handleLayout(this.height, e.nativeEvent.layout.height);
  }

  buildStyle() {
    const style:ViewStyle = {
      backgroundColor: Theme.wheelColor,
      overflow: 'hidden',
      ...this.props.style,
    };
    return style;
  }

  renderItem(item: any, itemIndex:number) {
    const itemStyle:TextStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      fontSize: Theme.wheelFontSize,
      color: Theme.wheelTextColor,
      ...this.props.itemStyle
    };

    if (Math.abs(this.index - itemIndex) > this.hiddenOffset) return null;
    if (typeof item === 'string' || typeof item === 'number') {
      item = <Text style={itemStyle}>{item}</Text>;
    }

    return (
      <Wheel.Item
        itemHeight={this.holeHeight}
        wheelHeight={this.height}
        index={itemIndex}
        currentPosition={this.currentPosition}
        key={itemIndex}
      >
        {item}
      </Wheel.Item>
    );
  }

  renderMask() {
    const maskStyle:ViewStyle = {
      backgroundColor: Theme.wheelMaskColor,
      opacity: Theme.wheelMaskOpacity,
      flex: 1,
      zIndex: 100,
      ...this.props
    };
    return <View style={maskStyle} />;
  }

  renderHole() {
    const holeStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: Theme.wheelHoleHeight,
      zIndex: 1,
      ...this.props.holeStyle,
    };
    return <View style={holeStyle} onLayout={this.onHoleLayout} />;
  }

  renderHoleLine() {
    let { holeLine } = this.props;
    if (holeLine === undefined) {
      holeLine = <View style={{ height: Theme.wheelHoleLineWidth, backgroundColor: Theme.wheelHoleLineColor }} />;
    } else if (typeof holeLine === 'number') {
      holeLine = <View style={{ height: holeLine, backgroundColor: Theme.wheelHoleLineColor }} />;
    }
    return holeLine;
  }

  render() {
    const { style, children, items, itemStyle, holeStyle, maskStyle, holeLine, index, defaultIndex, onChange, onLayout, ...others } = this.props;
    if (index || index === 0) this.index = index;
    this.lastRenderIndex = this.index;
    return (
      <View
        {...others}
        style={this.buildStyle()}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        {items.map((item: any, index:number) => this.renderItem(item, index))}
        {this.renderMask()}
        {this.renderHoleLine()}
        {this.renderHole()}
        {this.renderHoleLine()}
        {this.renderMask()}
      </View>
    )
  }
}
