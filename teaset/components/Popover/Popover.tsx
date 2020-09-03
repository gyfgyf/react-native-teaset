// Popover.js

'use strict';

import React, {Component} from "react";
import {StyleSheet, View, ViewProps, LayoutChangeEvent, ViewStyle} from 'react-native';

import Theme from '../../themes/Theme';

interface PopoverProps extends ViewProps{
  arrow?:
  'none' |
  'topLeft' |
  'top' |
  'topRight' |
  'rightTop' |
  'right' |
  'rightBottom' |
  'bottomRight' |
  'bottom' |
  'bottomLeft' |
  'leftBottom' |
  'left' |
  'leftTop';
  paddingCorner?: number;
  headerStyle?: ViewStyle;
  arrowStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  popoverStyle?: ViewStyle;
}
interface PopoverState{
  width: number;
  height: number;
}
export default class Popover extends Component<PopoverProps,PopoverState> {
  static defaultProps = {
    arrow: 'none',
  };

  constructor(props:PopoverProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  filterPopoverStyle(fs:ViewStyle, includeRadius:boolean) {
    let {flexDirection, alignItems, justifyContent, margin, marginBottom, marginHorizontal, marginLeft, marginRight, marginTop, marginVertical, padding, paddingBottom, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingVertical, backgroundColor, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomWidth, borderColor, borderLeftColor, borderLeftWidth, borderRadius, borderRightColor, borderRightWidth, borderStyle, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderWidth, ...others} = fs;
    let style:any = includeRadius ? {borderBottomLeftRadius, borderBottomRightRadius, borderRadius, borderTopLeftRadius, borderTopRightRadius, ...others} : {...others};
    for (let key in style) {
      if (style[key] === undefined) {
        delete style[key];
      }
    }
    return style;
  }

  filterContentStyle(fs:ViewStyle) {
    let {flexDirection, alignItems, justifyContent, margin, marginBottom, marginHorizontal, marginLeft, marginRight, marginTop, marginVertical, padding, paddingBottom, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingVertical, backgroundColor, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomWidth, borderColor, borderLeftColor, borderLeftWidth, borderRadius, borderRightColor, borderRightWidth, borderStyle, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderWidth, ...others} = fs;
    let style:any = {flexDirection, alignItems, justifyContent, margin, marginBottom, marginHorizontal, marginLeft, marginRight, marginTop, marginVertical, padding, paddingBottom, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingVertical, backgroundColor, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomWidth, borderColor, borderLeftColor, borderLeftWidth, borderRadius, borderRightColor, borderRightWidth, borderStyle, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderWidth};
    for (let key in style) {
      if (style[key] === undefined) {
        delete style[key];
      }
    }
    return style;
  }

  buildStyle() {
    const {style, arrow= 'none', paddingCorner} = this.props;

    let fs = StyleSheet.flatten([styles.base,style]);
    let {backgroundColor, borderColor, borderRadius, borderWidth=0} = fs;

    let arrowSize = 7; //Square side length
    let halfSquareSize = Math.sqrt(arrowSize * arrowSize * 2) / 2; //The half-length of the square diagonal: sqrt(7^2 + 7^2) / 2 = 4.95
    halfSquareSize = Math.ceil(halfSquareSize / Theme.pixelSize) * Theme.pixelSize;
    let headerSize = halfSquareSize + borderWidth;
    let headerPadding = headerSize - arrowSize / 2; //Let the center of square on the edge: 5 - (7 / 2) = 1.5
    let headerPaddingCorner = paddingCorner ? paddingCorner : Theme.popoverPaddingCorner;
    let contentPadding = halfSquareSize;

    let headerLayouts = {
      none:        {},
      topLeft:     {top: 0, left: 0, right: 0, height: headerSize, paddingTop: headerPadding, alignItems: 'flex-start', paddingLeft: headerPaddingCorner},
      top:         {top: 0, left: 0, right: 0, height: headerSize, paddingTop: headerPadding, alignItems: 'center'},
      topRight:    {top: 0, left: 0, right: 0, height: headerSize, paddingTop: headerPadding, alignItems: 'flex-end', paddingRight: headerPaddingCorner},
      rightTop:    {top: 0, bottom: 0, right: 0, width: headerSize, paddingRight: headerPadding, alignItems: 'flex-end', justifyContent: 'flex-start', paddingTop: headerPaddingCorner},
      right:       {top: 0, bottom: 0, right: 0, width: headerSize, paddingRight: headerPadding, alignItems: 'flex-end', justifyContent: 'center'},
      rightBottom: {top: 0, bottom: 0, right: 0, width: headerSize, paddingRight: headerPadding, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: headerPaddingCorner},
      bottomRight: {bottom: 0, left: 0, right: 0, height: headerSize, paddingBottom: headerPadding, alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: headerPaddingCorner},
      bottom:      {bottom: 0, left: 0, right: 0, height: headerSize, paddingBottom: headerPadding, alignItems: 'center', justifyContent: 'flex-end'},
      bottomLeft:  {bottom: 0, left: 0, right: 0, height: headerSize, paddingBottom: headerPadding, alignItems: 'flex-start', justifyContent: 'flex-end', paddingLeft: headerPaddingCorner},
      leftBottom:  {top: 0, bottom: 0, left: 0, width: headerSize, paddingLeft: headerPadding, alignItems: 'flex-start', justifyContent: 'flex-end', paddingBottom: headerPaddingCorner},
      left:        {top: 0, bottom: 0, left: 0, width: headerSize, paddingLeft: headerPadding, alignItems: 'flex-start', justifyContent: 'center'},
      leftTop:     {top: 0, bottom: 0, left: 0, width: headerSize, paddingLeft: headerPadding, alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: headerPaddingCorner},
    };
    let arrowLayouts = {
      none:        {},
      topLeft:     {transform: [{rotate: '45deg'}]},
      top:         {transform: [{rotate: '45deg'}]},
      topRight:    {transform: [{rotate: '45deg'}]},
      rightTop:    {transform: [{rotate: '135deg'}]},
      right:       {transform: [{rotate: '135deg'}]},
      rightBottom: {transform: [{rotate: '135deg'}]},
      bottomRight: {transform: [{rotate: '225deg'}]},
      bottom:      {transform: [{rotate: '225deg'}]},
      bottomLeft:  {transform: [{rotate: '225deg'}]},
      leftBottom:  {transform: [{rotate: '315deg'}]},
      left:        {transform: [{rotate: '315deg'}]},
      leftTop:     {transform: [{rotate: '315deg'}]},
    };
    let popoverLayouts = {
      none:        {},
      topLeft:     {paddingTop: contentPadding},
      top:         {paddingTop: contentPadding},
      topRight:    {paddingTop: contentPadding},
      rightTop:    {paddingRight: contentPadding},
      right:       {paddingRight: contentPadding},
      rightBottom: {paddingRight: contentPadding},
      bottomRight: {paddingBottom: contentPadding},
      bottom:      {paddingBottom: contentPadding},
      bottomLeft:  {paddingBottom: contentPadding},
      leftBottom:  {paddingLeft: contentPadding},
      left:        {paddingLeft: contentPadding},
      leftTop:     {paddingLeft: contentPadding},
    }
    let useArrow = arrow;
    switch (arrow) {
      case 'topLeft':
      case 'topRight':
        if (headerPaddingCorner + contentPadding > this.state.width / 2) useArrow = 'top';
        break;
      case 'rightTop':
      case 'rightBottom':
        if (headerPaddingCorner + contentPadding > this.state.height / 2) useArrow = 'right';
        break;
      case 'bottomRight':
      case 'bottomLeft':
        if (headerPaddingCorner + contentPadding > this.state.width / 2) useArrow = 'bottom';
        break;
      case 'leftBottom':
      case 'leftTop':
        if (headerPaddingCorner + contentPadding > this.state.height / 2) useArrow = 'left';
        break;
    }
    
    const arrowStyle ={
      backgroundColor,
      width: arrowSize,
      height: arrowSize,
      borderColor,
      borderTopWidth: borderWidth,
      borderLeftWidth: borderWidth,
      ...arrowLayouts[useArrow],
    };
    const contentStyle = this.filterContentStyle(fs);
    const popoverStyle = [this.filterPopoverStyle(fs, useArrow === 'none'), {
      backgroundColor: useArrow === 'none' ? Theme.popoverColor : 'rgba(0, 0, 0, 0)', //Transparent background will cause a warning at debug mode
    }].concat(popoverLayouts[useArrow]);
    const headerStyle = StyleSheet.flatten([styles.headerStyle,headerLayouts[useArrow]])
    return {popoverStyle, contentStyle, headerStyle, arrowStyle};
  }

  onLayout=(e:LayoutChangeEvent)=> {
    let {width, height} = e.nativeEvent.layout;
    if (width != this.state.width || height != this.state.height) {
      this.setState({width, height});
    }
    this.props.onLayout && this.props.onLayout(e);
  }

  render() {
    const {style, children, arrow, paddingCorner, onLayout, ...others} = this.props;
    const {popoverStyle, contentStyle, headerStyle, arrowStyle} = this.buildStyle();
    return (
      <View style={popoverStyle} onLayout={this.onLayout} {...others}>
        <View style={contentStyle}>
          {children}
        </View>
        {!arrow || arrow === 'none' ? null : <View style={headerStyle}><View style={arrowStyle} /></View>}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Theme.popoverColor,
    borderColor: Theme.popoverBorderColor,
    borderRadius: Theme.popoverBorderRadius,
    borderWidth: Theme.popoverBorderWidth,
  },
  headerStyle: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  }
})