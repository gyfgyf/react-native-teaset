// SegmentedView.js

'use strict';

import React, { Component, ReactElement, ReactNode } from 'react';
import { View, ViewPropTypes, ViewStyle, StyleSheet } from 'react-native';
import SegmentedSheet from './SegmentedSheet';
import SegmentedBar from '../SegmentedBar/SegmentedBar';
import Projector from '../Projector/Projector';
import Carousel from '../Carousel/Carousel';

interface SegmentedViewProps {
  type: 'projector' | 'carousel';
  barPosition: 'top' | 'bottom';
  //SegmentedBar
  barStyle?: ViewStyle;
  style?: ViewStyle;
  justifyItem?: 'fixed' | 'scrollable';
  indicatorType?: 'none' | 'boxWidth' | 'itemWidth';
  indicatorPosition?: 'top' | 'bottom';
  indicatorLineColor?: string;
  indicatorLineWidth?: number;
  indicatorPositionPadding?: number;
  animated?: boolean;
  autoScroll?: boolean;
  activeIndex?: number;
  onChange?: (index: number) => void;
}
interface SegmentedViewState{
  activeIndex: number;
}
export default class SegmentedView extends Component<SegmentedViewProps,SegmentedViewState> {
  private carouselRef: any;
  static propTypes = {
    ...ViewPropTypes,
  };

  static defaultProps = {
    type: 'projector',
    barPosition: 'top',
  };

  static Sheet = SegmentedSheet;
  constructor(props:SegmentedViewProps) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIndex || 0,
    };
  }

  componentDidUpdate(prevProps:SegmentedViewProps) {
    if (prevProps.activeIndex != this.props.activeIndex && this.refs.carousel) {
      this.carouselRef.scrollToPage(this.props.activeIndex);
    }
  }

  get sheets() {
    const { children } = this.props;
    let $children:any = children;
    if (!(children instanceof Array)) {
      if (children) $children = [children];
      else $children = [];
    }
    $children = $children.filter((item:ReactElement) => item); //remove empty item
    return $children;
  }

  get activeIndex() {
    let activeIndex = this.props.activeIndex;
    if (activeIndex || activeIndex === 0) return activeIndex;
    else return this.state.activeIndex;
  }

  buildStyle() {
    const { style } = this.props;
    return StyleSheet.flatten([styles.base,style])
  }

  onSegmentedBarChange(index:number) {
    if (index == this.activeIndex) return;
    this.setState({ activeIndex: index }, () => {
      if (this.carouselRef) {
        this.carouselRef.scrollToPage(index, false);
      }
      this.props.onChange && this.props.onChange(index);
    });
  }

  onCarouselChange(index:number) {
    if (index == this.state.activeIndex) return;
    this.setState({ activeIndex: index }, () => {
      this.props.onChange && this.props.onChange(index);
    });
  }

  renderBar() {
    const { barPosition, barStyle, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorLineWidth, indicatorPositionPadding, animated, autoScroll, onChange } = this.props;
    let $indicatorPosition = indicatorPosition;
    if (!indicatorPosition && barPosition == 'bottom') {
      $indicatorPosition = 'top';
    }

    return (
      <View>
        <SegmentedBar
          style={barStyle}
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={$indicatorPosition}
          indicatorLineColor={indicatorLineColor}
          indicatorLineWidth={indicatorLineWidth}
          indicatorPositionPadding={indicatorPositionPadding}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={this.activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}
        >
          {this.sheets && this.sheets.map((item:ReactElement, index:number) => (
            <SegmentedBar.Item
              key={index}
              title={item.props.title}
              titleStyle={item.props.titleStyle}
              activeTitleStyle={item.props.activeTitleStyle}
              badge={item.props.badge}
            />
          ))}
        </SegmentedBar>
      </View>
    );
  }

  renderProjector() {
    return (
      <Projector style={{ flex: 1 }} index={this.activeIndex}>
        {this.sheets}
      </Projector>
    );
  }

  renderCarousel() {
    return (
      <Carousel
        style={{ flex: 1 }}
        carousel={false}
        startIndex={this.activeIndex}
        cycle={false}
        ref={ref=>(this.carouselRef=ref)}
        onChange={(index:number) => this.onCarouselChange(index)}
      >
        {this.sheets}
      </Carousel>
    );
  }

  render() {
    const { style, children, type, barPosition, barStyle, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorLineWidth, indicatorPositionPadding, animated, autoScroll, activeIndex, onChange, ...others } = this.props;
    return (
      <View style={this.buildStyle()} {...others}>
        {barPosition === 'top' ? this.renderBar() : null}
        {type === 'carousel' ? this.renderCarousel() : this.renderProjector()}
        {barPosition === 'bottom' ? this.renderBar() : null}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  base:{
    flexDirection: 'column',
    alignItems: 'stretch',
  }
})