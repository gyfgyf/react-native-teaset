// AlbumView.js

'use strict';

import React, { Component, ReactElement } from "react";
import { GestureResponderEvent, View, Animated, ViewProps, ImageSourcePropType, ViewBase } from 'react-native';
import Theme from '../../themes/Theme';
import AlbumSheet from './AlbumSheet';
import CarouselControl from '../Carousel/CarouselControl';

export interface AlbumViewProps extends ViewProps {
  images: ImageSourcePropType[];
  thumbs: ImageSourcePropType;
  defaultIndex: number;
  index: number;
  maxScale: number;
  space: number;
  control: boolean | ReactElement;
  onWillChange: (index: number, oldIndex: number) => void;
  onChange: (index: number, oldIndex: number) => void;
  onPress: (index: number, e: GestureResponderEvent) => void; //(index, event)
  onLongPress: (index: number, e: GestureResponderEvent) => void; //(index, event)
  onWillLoadImage: (index: number) => void; //(index)
  onLoadImageSuccess: (index: number, width: number, height: number) => void; //(index, width, height)
  onLoadImageFailure: (index: number, error: any) => void; //(index, error)
}

interface AlbumViewState {
  index: number;
}
export default class AlbumView extends Component<AlbumViewProps, AlbumViewState> {

  static defaultProps = {
    ...ViewBase,
    defaultIndex: 0,
    maxScale: 3,
    space: 20,
    control: false,
  };
  private animateActions: any[];
  private layout = { x: 0, y: 0, width: 0, height: 0 }
  private saveScale: any;
  static Sheet = AlbumSheet;
  static Control = CarouselControl;

  constructor(props: AlbumViewProps) {
    super(props);
    this.animateActions = [];
    this.layout = { x: 0, y: 0, width: 0, height: 0 };
    let index = props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.state = {
      index: index,
    };
  }

  componentDidUpdate(prevProps: AlbumViewProps) {
    if ((this.props.index || this.props.index === 0) && prevProps.index != this.props.index) {
      this.changeIndex(this.props.index);
    }
  }

  needLoad(index: number) {
    return index >= this.state.index - 1 && index <= this.state.index + 1;
  }

  changeIndex(newIndex: number) {
    let { index } = this.state;
    if (newIndex == index) return;

    this.props.onWillChange && this.props.onWillChange(index, newIndex);
    this.setState({ index: newIndex });

    let sheet: any = this.refs['sheet' + index];
    let nextSheet: any = this.refs['sheet' + newIndex];
    let toPosition = newIndex > index ? 'left' : 'right';

    this.animateActions = [];
    sheet && sheet.scrollTo(toPosition, true, (variable: any, toValue: any) => {
      this.animateActions.push({ variable, toValue })
    });
    nextSheet && nextSheet.scrollTo('center', true, (variable: any, toValue: any) => {
      this.animateActions.push({ variable, toValue })
    });
    if (this.animateActions.length === 0) return;

    Animated.parallel(this.animateActions.map((item, index) =>
      Animated.spring(item.variable, { toValue: item.toValue, friction: 9, useNativeDriver: false })
    )).start(e => {
      this.props.onChange && this.props.onChange(newIndex, index);
    });

  }

  checkStopScroll() {
    this.animateActions.map((item, index) => {
      item.variable.stopAnimation();
      item.variable.setValue(item.toValue);
    });
    this.animateActions = [];
  }

  checkScroll(translateX: any) {
    let { images } = this.props;
    let { index } = this.state;
    let { contentLayout } = this.refs['sheet' + index];
    let { x, y, width, height } = contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.layout.width) {
      ltx = x;
      rtx = x + (width - this.layout.width);
    }
    let triggerWidth = this.layout.width / 3;

    if ((ltx < triggerWidth && rtx > -triggerWidth)
      || (ltx >= triggerWidth && index === 0)
      || (rtx <= -triggerWidth && index === images.length - 1)) {
      index > 0 && this.refs['sheet' + (index - 1)].scrollX(0, true);
      index < (images.length - 1) && this.refs['sheet' + (index + 1)].scrollX(0, true);
      return true;
    }

    this.changeIndex(ltx >= triggerWidth ? index - 1 : index + 1);

    return false;
  }

  // for CarouselControl
  scrollToPage(newIndex: number) {
    this.changeIndex(newIndex);
  }

  onTransforming(translateX: any, translateY: any, scale: any) {
    let saveScale = this.saveScale;
    this.saveScale = scale;
    if (scale < 1 || (saveScale && scale < saveScale)) {
      return;
    }

    let { images } = this.props;
    let { index } = this.state;
    let { x, y, width, height } = this.refs['sheet' + index].contentLayout;
    let ltx = translateX, rtx = translateX;
    if (width > this.layout.width) {
      ltx = x;
      rtx = x + (width - this.layout.width);
    }

    index > 0 && this.refs['sheet' + (index - 1)].scrollX(ltx, false);
    index < (images.length - 1) && this.refs['sheet' + (index + 1)].scrollX(rtx, false);
  }

  onWillInertialMove(translateX: any, translateY: any, newX: any, newY: any) {
    return this.checkScroll(newX);
  }

  onWillMagnetic(translateX: any, translateY: any, scale: any, newX: any, newY: any, newScale: any) {
    return scale < 1 || this.checkScroll(translateX);
  }

  renderImage(index: number) {
    let { images, thumbs, maxScale, space, onPress, onLongPress, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure } = this.props;
    let position = 'center';
    if (index < this.state.index) position = 'left';
    else if (index > this.state.index) position = 'right';

    return (
      <AlbumSheet
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        pointerEvents={index === this.state.index ? 'auto' : 'none'}
        minScale={1}
        maxScale={maxScale}
        magnetic={true}
        tension={false}
        image={images[index]}
        thumb={thumbs instanceof Array && thumbs.length > index ? thumbs[index] : undefined}
        defaultPosition={position}
        space={space}
        load={index >= this.state.index - 1 && index <= this.state.index + 1}
        onWillTransform={() => this.checkStopScroll()}
        onTransforming={(translateX: any, translateY: any, scale: any) => this.onTransforming(translateX, translateY, scale)}
        onWillInertialMove={(translateX: any, translateY: any, newX: any, newY: any) => this.onWillInertialMove(translateX, translateY, newX, newY)}
        onWillMagnetic={(translateX: any, translateY: any, scale: any, newX: any, newY: any, newScale: any) => this.onWillMagnetic(translateX, translateY, scale, newX, newY, newScale)}
        onPress={e => onPress && onPress(index, e)}
        onLongPress={e => onLongPress && onLongPress(index, e)}
        onWillLoadImage={() => onWillLoadImage && onWillLoadImage(index)}
        onLoadImageSuccess={(width: number, height: number) => onLoadImageSuccess && onLoadImageSuccess(index, width, height)}
        onLoadImageFailure={(error: any) => onLoadImageFailure && onLoadImageFailure(index, error)}
        ref={'sheet' + index}
        key={'sheet' + index}
      />
    );
  }

  render() {
    let { images, thumbs, defaultIndex, index, maxScale, space, control, children, onLayout, onWillChange, onChange, onPress, onLongPress, onWillLoadImage, onLoadImageSuccess, onLoadImageFailure, ...others } = this.props;

    if (React.isValidElement(control)) {
      control = React.cloneElement(control, { index: this.state.index, total: images.length, carousel: this });
    } else if (control) {
      control = <AlbumView.Control style={{ paddingBottom: Theme.screenInset.bottom }} index={this.state.index} total={images.length} carousel={this} />
    }

    return (
      <View
        onLayout={e => {
          this.layout = e.nativeEvent.layout;
          onLayout && onLayout(e);
        }}
        {...others}
      >
        {images.map((item: any, index: number) => this.renderImage(index))}
        {control}
      </View>
    );
  }

}
