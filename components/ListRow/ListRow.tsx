// ListRow.js

'use strict';

import React, {Component, ReactElement} from 'react';
import PropTypes from 'prop-types';
import { View, Image, TextStyle,ViewStyle, StyleSheet,LayoutChangeEvent, ImageStyle } from 'react-native';

import Theme from '../../themes/Theme';
import Label from '../Label/Label';
import SwipeTouchableOpacity from './SwipeTouchableOpacity';
import SwipeActionButton from './SwipeActionButton';

interface ListRowProps  {
  title?: ReactElement | string | number;
  detail?: ReactElement | string | number;
  titleStyle?: TextStyle;
  detailStyle?: TextStyle;
  detailMultiLine?: boolean; //是否支持多行内容
  titlePlace?: 'none' | 'left' | 'top';
  accessory?: ReactElement | number | object | 'none' | 'auto' | 'empty' | 'check' | 'indicator';
  onPress?: Function;
  style?: ViewStyle;
  swipeActions?: ReactElement[];
  icon?: ReactElement | number | object;
  bottomSeparator: ReactElement | 'none' | 'full' | 'indent';
  topSeparator: ReactElement | 'none' | 'full' | 'indent';
  activeOpacity?: any;
  onLayout?: (e:LayoutChangeEvent)=>void;
}
interface ListRowState{
  swipeWidth: number;
  swipeSts: string;
}
export default class ListRow extends Component<ListRowProps,ListRowState> {

  static propTypes = {
    ...SwipeTouchableOpacity.propTypes,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    accessory: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number, PropTypes.oneOf(['none', 'auto', 'empty', 'check', 'indicator'])]),
  };

  static defaultProps = {
    ...SwipeTouchableOpacity.defaultProps,
    activeOpacity: null,
    accessory: 'auto',
    topSeparator: 'none',
    bottomSeparator: 'indent',
    titlePlace: 'left',
  };
  private containerViewRef: any;
  static SwipeActionButton = SwipeActionButton;

  constructor(props:ListRowProps) {
    super(props);
    this.state = {
      swipeSts: 'none',
      swipeWidth: 0,
    }
  }

  measureInWindow(callback:Function) {
    this.containerViewRef && this.containerViewRef.measureInWindow(callback);
  }

  measure(callback:Function) {
    this.containerViewRef && this.containerViewRef.measure(callback);
  }

  closeSwipeActions() {
    this.containerViewRef && this.containerViewRef.timingClose();
  }

  buildStyle() {
    const {style} = this.props;
    const styles = StyleSheet.create({
      container: {
        backgroundColor: Theme.rowColor,
        paddingLeft: Theme.rowPaddingLeft,
        paddingRight: Theme.rowPaddingRight,
        paddingTop: Theme.rowPaddingTop,
        paddingBottom: Theme.rowPaddingBottom,
        minHeight: Theme.rowMinHeight,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }
    })
    return styles.container;
  }

  renderSeparator(type:ReactElement | 'none' | 'full' | 'indent') {
    const separatorStyle:ViewStyle = {
      backgroundColor: Theme.rowSeparatorColor,
      height: Theme.rowSeparatorLineWidth,
      
    };
    const indentViewStyle:ViewStyle = {
      backgroundColor: Theme.rowColor,
      paddingLeft: Theme.rowPaddingLeft,
    }

    switch (type) {
      case 'full': return <View style={separatorStyle} />;
      case 'indent': return <View style={indentViewStyle}><View style={separatorStyle} /></View>;
      default: return null;
    }
  }

  renderSwipeActionView() {
    const {swipeActions} = this.props;
    if (!(swipeActions instanceof Array) || swipeActions.length == 0) return null;

    let {swipeSts} = this.state;
    const styles = StyleSheet.create({
      swipeActionViewStyle:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        opacity: swipeSts === 'none' ? 0 : 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      }
    }) 
    return (
      <View
        style={styles.swipeActionViewStyle}
        onLayout={e => this.setState({swipeWidth: e.nativeEvent.layout.width})}
      >
        {swipeActions.map((item:any, index) => React.cloneElement(item, {
          key: item.key ? item.key : 'action' + index,
          onPress: () => {
            this.containerViewRef && this.containerViewRef.timingClose();
            item.props.onPress && item.props.onPress();
          }
        }))}
      </View>
    );
  }

  renderIcon() {
    let {icon} = this.props;
    if (icon === null || icon === undefined || React.isValidElement(icon)) return icon;
    return (
      <View style={{paddingRight: Theme.rowIconPaddingRight}}>
        <Image style={{width: Theme.rowIconWidth, height: Theme.rowIconHeight}} source={icon} />
      </View>
    );
  }

  renderAccessory(accessory = this.props.accessory) {
    if (React.isValidElement(accessory)) return accessory;
    if (accessory === 'none' || (accessory === 'auto' && !this.props.onPress)) return null;

    let imageSource, tintColor;
    switch (accessory) {
      case 'empty':
        imageSource = require('../../icons/empty.png');
        break;
      case 'check':
        imageSource = require('../../icons/check.png');
        tintColor = Theme.rowAccessoryCheckColor;
        break;
      case 'indicator':
      case 'auto':
        imageSource = require('../../icons/indicator.png');
        tintColor = Theme.rowAccessoryIndicatorColor;
        break;
      default: imageSource = accessory;
    }
    const imageStyle:ImageStyle = {
      width: Theme.rowAccessoryWidth,
      height: Theme.rowAccessoryHeight,
      tintColor,
    };
    return (
      <View style={{paddingLeft: Theme.rowAccessoryPaddingLeft}}>
        <Image style={imageStyle} source={imageSource} />
      </View>
    );
  }

  renderTitle() {
    const {title, detail, titleStyle, titlePlace} = this.props;
    if (titlePlace === 'none') return null;
    if (typeof title === 'string' || typeof title === 'number') {
      let textStyle = (!detail && titlePlace === 'left') ? {flexGrow: 1, flexShrink: 1} : null;
      return <Label style={StyleSheet.flatten([textStyle, titleStyle])} type='title' text={title} />;
    }
    return title;
  }

  renderDetail() {
    let {title, detail, detailStyle, detailMultiLine, titlePlace} = this.props;
    if (typeof detail === 'string' || typeof detail === 'number') {
      let textStyle:TextStyle = titlePlace === 'top' ? {lineHeight: Theme.rowDetailLineHeight, color: Theme.labelTextColor} : {flexGrow: 1, flexShrink: 1, textAlign: 'right'};
      if (title) {
        if (titlePlace === 'left') textStyle.paddingLeft = Theme.rowPaddingTitleDetail;
        else textStyle.paddingTop = Theme.rowPaddingTitleDetail;
      }
      if (!detailMultiLine && detailMultiLine !== false) {
        detailMultiLine = titlePlace === 'top';
      }
      return <Label style={StyleSheet.flatten([textStyle, detailStyle])} type='detail' text={detail} numberOfLines={detailMultiLine ? 0 : 1} />;
    }
    return detail;
  }

  renderContent() {
    let {titlePlace, children} = this.props;
    let title = this.renderTitle();
    let detail = this.renderDetail();
    if (!title && !detail) return children;

    const styles = StyleSheet.create({
      contentStyle:{
        flex: 1,
        overflow: 'hidden',
        flexDirection: titlePlace === 'top' ? 'column' : 'row',
        alignItems: titlePlace === 'top' ? 'stretch' : 'center',
        justifyContent: 'space-between',
      }
    });
    return (
      <View style={styles.contentStyle}>
        {title}
        {detail}
      </View>
    );
  }

  render() {
    const {
      style,
      children,
      title,
      detail,
      titleStyle,
      detailStyle,
      detailMultiLine,
      icon,
      accessory,
      topSeparator,
      bottomSeparator,
      titlePlace,
      swipeActions,
      activeOpacity,
      onLayout,
      onPress,
      ...others
    } = this.props;
    const swipeable = swipeActions instanceof Array && swipeActions.length > 0;
    return (
      <View onLayout={onLayout}>
        {this.renderSeparator(topSeparator)}
        {this.renderSwipeActionView()}
        <SwipeTouchableOpacity
          {...others}
          style={this.buildStyle()}
          activeOpacity={(!activeOpacity && activeOpacity !== 0) ? (onPress ? 0.2 : 1) : activeOpacity}
          swipeable={swipeable}
          swipeWidth={this.state.swipeWidth}
          onPress={onPress}
          onSwipeStsChange={(swipeSts:string) => this.setState({swipeSts})}
          ref={ref=>(this.containerViewRef=ref)}
        >
          {this.renderIcon()}
          {this.renderContent()}
          {this.renderAccessory()}
        </SwipeTouchableOpacity>
        {this.renderSeparator(bottomSeparator)}
      </View>
    );
  }

}
