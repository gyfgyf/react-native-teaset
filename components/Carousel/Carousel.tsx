// Carousel.js

'use strict';

import React, { Component, ReactElement, ReactChildren } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import CarouselControl from './CarouselControl';

interface CarouselProps extends ScrollViewProps {
  carousel: boolean;//是否开启轮播
  interval: number; //每页停留时间
  direction: 'forward' | 'backward'; //轮播方向
  startIndex: number; //起始页面编号，从0开始
  cycle: boolean;//是否循环
  control: boolean | ReactElement;
  onChange: (index:number,total:number)=>void;//(index, total) 页面改变时调用
  children: ReactChildren,
}
interface CarouselState {
  width: number;
  height: number;
  pageIndex: number;
}
export default class Carousel extends Component<CarouselProps, CarouselState> {
  static defaultProps = {
    horizontal: true, //修改为false是纵向滚动
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    bounces: false,
    automaticallyAdjustContentInsets: false,
    scrollEventThrottle: 200,
    scrollsToTop: false,

    carousel: true,
    interval: 3000,
    direction: 'forward',
    startIndex: 0,
    cycle: true,
    control: false,
  };
  private scrollViewRef: any;
  private cardIndex: any;
  private pageCount: any;
  private carousel: any;
  private cycle: any;
  private forward: any;
  private cardCount: any;
  private step: any;
  private timer: any;
  static Control = CarouselControl;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      pageIndex: 0,
    };
    this.cardIndex = null;
    this.initByProps();
    this.setupTimer();
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    setTimeout(() => this.scrollToCard(this.cardIndex, false), 50);
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    this.removeTimer();
  }

  componentDidUpdate(prevProps: CarouselProps) {
    let { children, carousel, direction, startIndex, cycle } = this.props;
    let pageCount = children ? (children instanceof Array ? children.length : 1) : 0;
    if (pageCount != this.pageCount
      || carousel != prevProps.carousel
      || direction != prevProps.direction
      || startIndex != prevProps.startIndex
      || cycle != prevProps.cycle) {
      this.initByProps();
      this.setupTimer();
    }
  }

  //滚动到指定页
  scrollToPage = (index: number, animated = true) => {
    this.scrollToCard(this.cycle ? index + 1 : index, animated);
  }

  //滚动到下一页
  scrollToNextPage(animated = true) {
    this.scrollToNextCard(animated);
  }

  //初始化轮播参数
  initByProps() {
    let { children, carousel, direction, startIndex, cycle } = this.props;

    //页数
    this.pageCount = children ? (children instanceof Array ? children.length : 1) : 0;

    let multiPage = this.pageCount > 1;

    //是否轮播
    this.carousel = carousel && multiPage;

    //是否循环
    this.cycle = cycle && multiPage;

    //是否正向轮播（从左往右顺序轮播，卡片从右往左滚动）
    this.forward = direction === 'forward';

    //卡片数量，card定义：轮播中的页面序列，如为循环播放则首尾各多一页，如页面为0-1-2，则cards为2-0-1-2-0
    this.cardCount = multiPage && this.cycle ? this.pageCount + 2 : this.pageCount;
    if (this.cardIndex === null || this.cardIndex >= this.cardCount)
      this.cardIndex = multiPage && this.cycle ? startIndex + 1 : startIndex;

    //下一页卡片步进
    this.step = this.forward ? 1 : -1;
  }

  //设置定时器，开启轮播时在interval毫秒之后滚动到下一卡片
  setupTimer() {
    this.removeTimer();
    if (!this.carousel) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.scrollToNextCard();
    }, this.props.interval);
  }

  //删除定时器
  removeTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  //滚动到指定卡片
  scrollToCard(cardIndex: number, animated = true) {
    let { width, height } = this.state;
    if (cardIndex < 0) cardIndex = 0;
    else if (cardIndex >= this.cardCount) cardIndex = this.cardCount - 1;
    if (this.scrollViewRef) {
      if (this.props.horizontal)
        this.scrollViewRef.scrollTo({ x: width * cardIndex, y: 0, animated: animated });
      else this.scrollViewRef.scrollTo({ x: 0, y: height * cardIndex, animated: animated });
    }
  }

  //滚动到下一张卡片
  scrollToNextCard(animated = true) {
    this.scrollToCard(this.cardIndex + this.step, animated);
  }

  //修改当前卡片编号
  changeCardIndex(cardIndex: number) {
    if (cardIndex == this.cardIndex) return;
    this.cardIndex = cardIndex;
    let total = this.pageCount;
    let pageIndex = this.cycle ? cardIndex - 1 : cardIndex;
    if (pageIndex < 0) pageIndex = total - 1;
    else if (pageIndex >= total) pageIndex = 0;
    this.setState({ pageIndex });
    this.props.onChange && this.props.onChange(pageIndex, total);
  }

  //横向滚动事件
  onHorizontalScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    let { width } = this.state;
    let { x } = e.nativeEvent.contentOffset;
    let cardIndex = Math.round(x / width);

    if (this.cycle) {
      if (cardIndex <= 0 && x <= 0) {
        cardIndex = this.cardCount - 2;
        this.scrollToCard(cardIndex, false);
      } else if (cardIndex >= this.cardCount - 1 && x >= (this.cardCount - 1) * width) {
        cardIndex = 1;
        this.scrollToCard(cardIndex, false);
      }
    }

    this.changeCardIndex(cardIndex);
    this.setupTimer();
  }

  //纵向滚动事件
  onVerticalScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    let { height } = this.state;
    let { y } = e.nativeEvent.contentOffset;
    let cardIndex = Math.round(y / height);

    if (this.cycle) {
      if (cardIndex <= 0 && y <= 0) {
        cardIndex = this.cardCount - 2;
        this.scrollToCard(cardIndex, false);
      } else if (cardIndex >= this.cardCount - 1 && y >= (this.cardCount - 1) * height) {
        cardIndex = 1;
        this.scrollToCard(cardIndex, false);
      }
    }

    this.changeCardIndex(cardIndex);
    this.setupTimer();
  }

  //页面滚动事件
  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (this.state.width == 0 || this.state.height == 0) return;
    this.props.horizontal ? this.onHorizontalScroll(e) : this.onVerticalScroll(e);
    this.props.onScroll && this.props.onScroll(e);
  }

  //布局变更时修改页面宽度、高度，刷新显示
  onLayout = (e: LayoutChangeEvent) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
    this.props.onLayout && this.props.onLayout(e);
  }

  //渲染卡片列表
  renderCards() {
    let { width, height } = this.state;
    let { children } = this.props;
    if (width <= 0 || height <= 0 || !children) return null;
    let arrayChildren: any = children;
    if (!(children instanceof Array)) {
      arrayChildren = [children];
    }
    let cards = [];

    const styles = StyleSheet.create({
      cardStyle: {
        width: width,
        height: height,
        overflow: 'hidden',
      }
    });
    this.cycle && cards.push(
      <View style={styles.cardStyle} key={'card-head'}>{arrayChildren[arrayChildren.length - 1]}</View>
    );
    arrayChildren.map((item: any, index: number) => cards.push(
      <View style={styles.cardStyle} key={'card' + index}>{item}</View>
    ));
    this.cycle && cards.push(
      <View style={styles.cardStyle} key={'card-tail'}>{arrayChildren[0]}</View>
    );
    return cards;
  }

  render() {
    const {
      style,
      children,
      horizontal,
      contentContainerStyle,
      control,
      onScroll,
      onLayout,
      onChange,
      direction,
      ...others
    } = this.props;
    let { width, height, pageIndex } = this.state;
    let contentStyle = {};
    const styles = StyleSheet.create({
      horizontalFixStyle: {
        width: width * this.cardCount,
        height: height,
      },
      verticalFixStyle: {
        width: width,
        height: height * this.cardCount
      }
    });
    if (width > 0 && height > 0) {
      if (horizontal) {
        contentStyle = styles.horizontalFixStyle;
      } else {
        contentStyle = styles.verticalFixStyle;
      };
    }
    let $control;
    if (React.isValidElement(control)) {
      $control = React.cloneElement(control, {
        index: pageIndex,
        total: this.pageCount,
        carousel: this,
        scrollToPage: this.scrollToPage,
      });
    } else if (control) {
      $control = <Carousel.Control
        index={pageIndex}
        total={this.pageCount}
        carousel={this}
        scrollToPage={this.scrollToPage}
      />
    }
    return (
      <View style={[style, { alignItems: 'stretch' }]}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={horizontal}
          contentContainerStyle={contentStyle}
          {...others}
          ref={ref => (this.scrollViewRef = ref)}
          onScroll={this.onScroll}
          onLayout={this.onLayout}
        >
          {this.renderCards()}
        </ScrollView>
        {$control}
      </View>
    );
  }
}