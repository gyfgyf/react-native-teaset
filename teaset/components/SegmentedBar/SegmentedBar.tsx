// SegmentedBar.js

'use strict';

import React, {Component, ReactChildren, ReactNode} from 'react';
import {View, ScrollView, TouchableOpacity, Animated, ViewProps, StyleSheet, ViewStyle, LayoutChangeEvent} from 'react-native';

import Theme from '../../themes/Theme';
import SegmentedItem from './SegmentedItem';

interface SegmentedBarProps extends ViewProps{
  justifyItem?: 'fixed' | 'scrollable';
  indicatorType?: 'none' | 'boxWidth' | 'itemWidth' | 'customWidth';
  indicatorPosition?: 'top' | 'bottom';
  indicatorLineColor?: string;
  indicatorWidth: number;
  indicatorLineWidth?: number;
  indicatorPositionPadding?: number;
  animated?: boolean;
  autoScroll?: boolean;
  activeIndex?: number;//if use this prop, you need update this value from onChange event
  onChange?: (index: number) => void;
  children: ReactChildren;
}
export default class SegmentedBar extends Component<SegmentedBarProps> {

  static defaultProps = {
    justifyItem: 'fixed',
    indicatorType: 'itemWidth',
    indicatorWidth: 20,
    indicatorPosition: 'bottom',
    animated: true,
    autoScroll: true,
  };
  private _activeIndex: number;
  private _buttonsLayout: any[];
  private _itemsLayout: any[];
  private _itemsAddWidth: any[];
  private _indicatorX: any;
  private _indicatorWidth: any;
  private _scrollViewWidth: number;
  private _saveIndicatorXValue: any;
  private _saveIndicatorWidthValue: any;
  private scrollViewRef: any;
  static Item = SegmentedItem;

  constructor(props:SegmentedBarProps) {
    super(props);
    this._activeIndex = this.props.activeIndex || 0;
    this._buttonsLayout = this.makeArray([], props.children);
    this._itemsLayout = this.makeArray([], props.children);
    this._itemsAddWidth = this.makeArray([], props.children, 0);
    this._indicatorX = null;
    this._indicatorWidth = null;
    this._scrollViewWidth = 0;
  }

  componentDidUpdate(prevProps:SegmentedBarProps) {
    let nextItemsLayout = this.makeArray(this._itemsLayout, this.props.children);
    if (nextItemsLayout.length != this._itemsLayout.length) {
      this._buttonsLayout = this.makeArray(this._buttonsLayout, this.props.children);
      this._itemsLayout = nextItemsLayout;
      this._itemsAddWidth = this.makeArray(this._itemsAddWidth, this.props.children, 0);
    }
    if (this.props.activeIndex || this.props.activeIndex === 0) {
      this._activeIndex = this.props.activeIndex;
    }
    if (this._activeIndex >= nextItemsLayout.length) {
      this._activeIndex = nextItemsLayout.length - 1;
    }
    this.updateIndicator();
  }

  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    if (this._activeIndex != value) {
      this._activeIndex = value;
      this.updateIndicator();
      this.forceUpdate();
      this.props.onChange && this.props.onChange(value);
    }
  }

  get indicatorXValue() {
    switch (this.props.indicatorType) {
      case 'boxWidth':
        return this._buttonsLayout[this._activeIndex].x;
      case 'itemWidth':
        return this._buttonsLayout[this._activeIndex].x + this._itemsLayout[this._activeIndex].x + this._itemsAddWidth[this._activeIndex] / 2;
      case 'customWidth':
        const isMoreThanDefault = this.props.indicatorWidth > this._itemsLayout[this.activeIndex].width;
        return isMoreThanDefault ?
          this._buttonsLayout[this._activeIndex].x + this._itemsLayout[this._activeIndex].x
          : this._buttonsLayout[this._activeIndex].x + (this._buttonsLayout[this._activeIndex].width - this.props.indicatorWidth) / 2;
    }
    return 0;
  }

  get indicatorWidthValue() {
    switch (this.props.indicatorType) {
      case 'boxWidth':
        return this._buttonsLayout[this.activeIndex].width;
      case 'itemWidth':
        return this._itemsLayout[this.activeIndex].width - this._itemsAddWidth[this._activeIndex];
      case 'customWidth':
        const isMoreThanDefault = this.props.indicatorWidth > this._itemsLayout[this.activeIndex].width;
        return isMoreThanDefault ? this._itemsLayout[this.activeIndex].width : this.props.indicatorWidth;
    }
    return 0;
  }

  makeArray(olders:any[], items:ReactChildren, empty = {x: 0, y:0, width: 0, height: 0}) {
    if (items instanceof Array) return items.map((item, index) => {
      return index < olders.length ? olders[index] : empty;
    });
    else if (items) return [olders.length > 0 ? olders[0] : empty];
    return [];
  }

  checkInitIndicator() {
    if (this._indicatorX && this._indicatorWidth) {
      this._indicatorX.setValue(this.indicatorXValue);
      this._indicatorWidth.setValue(this.indicatorWidthValue);
    } else {
      this._indicatorX = new Animated.Value(this.indicatorXValue);
      this._indicatorWidth = new Animated.Value(this.indicatorWidthValue);
    }
    this.forceUpdate();
  }

  updateIndicator() {
    if (!this._indicatorX || !this._indicatorWidth) return;

    let indicatorXValue = this.indicatorXValue;
    let indicatorWidthValue = this.indicatorWidthValue;
    if (indicatorXValue === this._saveIndicatorXValue
        && indicatorWidthValue === this._saveIndicatorWidthValue) {
      return;
    }

    this._saveIndicatorXValue = indicatorXValue;
    this._saveIndicatorWidthValue = indicatorWidthValue;
    if (this.props.animated) {
      Animated.parallel([
        Animated.spring(this._indicatorX, {toValue: indicatorXValue, friction: 9, useNativeDriver: false}),
        Animated.spring(this._indicatorWidth, {toValue: indicatorWidthValue, friction: 9, useNativeDriver: false}),
      ]).start();
    } else {
      this._indicatorX.setValue(indicatorXValue);
      this._indicatorWidth.setValue(indicatorWidthValue);
    }

    if (this.props.autoScroll && this.refs.scrollView) {
      let contextWidth = 0;
      this._buttonsLayout.map(item => contextWidth += item.width);
      let x = indicatorXValue + indicatorWidthValue / 2 - this._scrollViewWidth / 2;
      if (x < 0) {
        x = 0;
      } else if (x > contextWidth - this._scrollViewWidth) {
        x = contextWidth - this._scrollViewWidth;
      }
      this.scrollViewRef.scrollTo({x: x, y: 0, animated: this.props.animated});
    }
  }

  isEqualLayout(obj1:any, obj2:any) {
    return obj1.x == obj2.x && obj1.y == obj2.y && obj1.width == obj2.width && obj1.height == obj2.height;
  }

  onButtonPress=(index:number)=>()=> {
    this.activeIndex = index;
  }

  onButtonLayout=(index:number)=>(e:LayoutChangeEvent)=> {
    let {layout} = e.nativeEvent;
    if (!this.isEqualLayout(layout, this._buttonsLayout[index])) {
      this._buttonsLayout[index] = layout;
      this.checkInitIndicator();
    }
  }

  onItemLayout(index:number, e:LayoutChangeEvent) {
    let {layout} = e.nativeEvent;
    if (!this.isEqualLayout(layout, this._itemsLayout[index])) {
      this._itemsLayout[index] = layout;
      this.checkInitIndicator();
    }
  }

  onScrollViewLayout=(e:LayoutChangeEvent)=> {
    this._scrollViewWidth = e.nativeEvent.layout.width;
    this.props.onLayout && this.props.onLayout(e);
  }

  renderItem(item:any, index:number) {
    let saveOnLayout = item.props.onLayout;
    let newItem = React.cloneElement(item, {
      active: index === this.activeIndex,
      onLayout: (e:LayoutChangeEvent) => {
        this.onItemLayout(index, e);
        saveOnLayout && saveOnLayout(e);
      },
      onAddWidth: (width:number) => {
        if (width != this._itemsAddWidth[index]) {
          this._itemsAddWidth[index] = width;
          this.forceUpdate();
        }
      }
    });
    return newItem;
  }

  renderIndicator() {
    const {indicatorLineColor, indicatorLineWidth, indicatorPositionPadding} = this.props;
    let style:ViewStyle = {
      backgroundColor: indicatorLineColor ? indicatorLineColor : Theme.sbIndicatorLineColor,
      position: 'absolute',
      left: this._indicatorX,
      width: this._indicatorWidth,
      height: indicatorLineWidth || indicatorLineWidth === 0 ? indicatorLineWidth : Theme.sbIndicatorLineWidth,
    };
    if (this.props.indicatorPosition == 'top') {
      style.top = indicatorPositionPadding || indicatorPositionPadding === 0 ? indicatorPositionPadding : Theme.sbIndicatorPositionPadding;
    } else {
      style.bottom = indicatorPositionPadding || indicatorPositionPadding === 0 ? indicatorPositionPadding : Theme.sbIndicatorPositionPadding;
    }
    return (
      <Animated.View style={style} />
    );
  }
  getArrayChildren(children:ReactChildren) {
    let $children: ReactNode[] = [];
    if (!children) {
      $children = [];
    } else if (!(children instanceof Array)) {
      $children = [children];
    } else {
      $children=children
    }
    return $children;
  }
  renderFixed() {
    const { style, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorPositionPadding, animated, activeIndex, onChange, children, ...others } = this.props;
    const $children= this.getArrayChildren(children);
    return (
      <View style={StyleSheet.flatten([{ backgroundColor: Theme.sbColor,
        flexDirection: 'row',},style])} {...others}>
        {$children.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={this.onButtonPress(index)}
            onLayout={this.onButtonLayout(index)}
          >
            {this.renderItem(item, index)}
          </TouchableOpacity>
        ))}
        {this.renderIndicator()}
      </View>
    );
  }

  renderScrollable() {
    const { style, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorPositionPadding, animated, activeIndex, onChange, onLayout, children, ...others } = this.props;
    const $children= this.getArrayChildren(children);
    return (
      <ScrollView
        style={StyleSheet.flatten([{backgroundColor: Theme.sbColor},style])}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollsToTop={false}
        removeClippedSubviews={false}
        onLayout={this.onScrollViewLayout}
        ref={ref=>(this.scrollViewRef=ref)}
        {...others}
      >
        {$children && $children.map((item, index) => {
          return (
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            key={index}
            onPress={this.onButtonPress(index)}
            onLayout={this.onButtonLayout(index)}
          >
            {this.renderItem(item, index)}
          </TouchableOpacity>
        )})}
        {this.renderIndicator()}
      </ScrollView>
    );
  }

  render() {
    if (this.props.justifyItem === 'scrollable') return this.renderScrollable();
    else return this.renderFixed();
  }
}
