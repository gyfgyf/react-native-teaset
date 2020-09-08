// TabView.js

'use strict';

import React, {Component, ReactNode} from 'react';
import { View, ViewBase, ViewProps, ViewStyle, NativeSyntheticEvent,NativeTouchEvent } from 'react-native';

import Theme from '../../themes/Theme';
import TabSheet from './TabSheet';
import TabButton from './TabButton';
import Projector from '../Projector/Projector';
import Carousel from '../Carousel/Carousel';

interface TabViewProps extends ViewProps{
  type?: 'projector' | 'carousel';
  barStyle: ViewStyle;
  style?: ViewStyle;
  activeIndex: number;
  onChange?: (index: number) => void;
  children: ReactNode[];
}
interface TabViewStatus{
  activeIndex: number;
}

export default class TabView extends Component<TabViewProps,TabViewStatus> {
  private carouselRef: any;
  static defaultProps = {
    ...ViewBase,
    type: 'projector',
    activeIndex: 0,
    barStyle:{},
  };
 
  static Sheet = TabSheet;
  
  static Button = TabButton;

  constructor(props:TabViewProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  get sheets() {
    const { children } = this.props;
    let childrens:any = children;
    if (!(children instanceof Array)) {
      if (children) {
        childrens = [children];
      }else {
        childrens = []
      };
    }
    childrens = children.filter(item => item); //remove empty item
    return childrens;
  }

  get activeIndex() {
    let activeIndex = this.props.activeIndex;
    if (activeIndex || activeIndex === 0) return activeIndex;
    else return this.state.activeIndex;
  }

  buildStyle() {
    let {style} = this.props;
    const styles:ViewStyle = {
      flexDirection: 'column',
      alignItems: 'stretch',
      ...style,
    };
    return styles;
  }

  renderBar=()=> {
    //Overflow is not supported on Android, then use a higher container view to support "big icon button"
    const {onChange} = this.props;
    const {bottom: bottomInset} = Theme.screenInset;

    const barStyle:ViewStyle = {
      backgroundColor: Theme.tvBarColor,
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      height: Theme.tvBarHeight + bottomInset,
      paddingTop: Theme.tvBarPaddingTop,
      paddingBottom: Theme.tvBarPaddingBottom + bottomInset,
      borderTopWidth: Theme.tvBarSeparatorWidth,
      borderColor: Theme.tvBarSeparatorColor,
      ...this.props.barStyle
    };
    const height:number = Number(this.props.barStyle.height)  ||  (Theme.tvBarHeight + bottomInset) || 0;
    const paddingTop:number =Number(this.props.barStyle.paddingTop)  ||  Theme.tvBarPaddingTop || 0;
    const paddingBottom:number = Number(this.props.barStyle.paddingBottom) || (Theme.tvBarPaddingBottom + bottomInset) || 0;
    const buttonContainerStyle:ViewStyle = {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      paddingTop,
      paddingBottom,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    };

    const buttonStyle = {
      minHeight: (height  - paddingTop - paddingBottom),
    };

    let sheetCount = 0;
    return (
      <View  style={{height: barStyle.height}} pointerEvents='box-none'>
        <View style={barStyle} />
        <View style={buttonContainerStyle} pointerEvents='box-none'>
          {this.sheets.map((item:any, index:number) => {
            let {type, title, icon, activeIcon, iconContainerStyle, badge, onPress} = item.props;
            let sheetIndex = sheetCount;
            if (type === 'sheet') sheetCount += 1;
            return (
              <TabView.Button
                key={index}
                style={buttonStyle}
                title={title}
                icon={icon}
                activeIcon={activeIcon}
                active={type === 'sheet' ? sheetIndex === this.activeIndex : false}
                iconContainerStyle={iconContainerStyle}
                badge={badge}
                onPress={(e:NativeSyntheticEvent<NativeTouchEvent>) => {
                  if (type === 'sheet') {
                    this.setState({activeIndex: sheetIndex}, () => {
                      this.carouselRef && this.carouselRef.scrollToPage(sheetIndex);                  
                      onChange && onChange(sheetIndex);
                    });
                  }
                  onPress && onPress(e);
                }}
                />
            );
          })}
        </View>
      </View>
    );
  }

  renderProjector() {
    return (
      <Projector style={{flex: 1}} index={this.activeIndex}>
        {this.sheets.filter((item:any) => item && item.props.type === 'sheet')}
      </Projector>
    );
  }

  renderCarousel() {
    let {onChange} = this.props;
    return (
      <Carousel
        style={{flex: 1}}
        carousel={false}
        startIndex={this.activeIndex}
        cycle={false}
        ref={ref=>(this.carouselRef=ref)}
        onChange={(index:number) => {
          if (typeof index !== 'number') return;
          this.setState({activeIndex: index}, () => onChange && onChange(index));
        }}
      >
        {this.sheets.filter((item:any) => item && item.props.type === 'sheet')}
      </Carousel>
    );
  }

  render() {
    const {style, children, type, barStyle, activeIndex, onChange, ...others} = this.props;
    return (
      <View style={this.buildStyle()} {...others}>
        {type === 'carousel' ? this.renderCarousel() : this.renderProjector()}
        {this.renderBar()}
      </View>
    );
  }
}
