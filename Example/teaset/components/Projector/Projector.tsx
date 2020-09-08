// Projector.js

'use strict';

import React, { Component, ReactNode } from 'react';
import { StyleSheet, View, ViewBase, ViewProps, ViewStyle } from 'react-native';

interface ProjectorProps extends ViewProps {
  index: number,
  slideStyle?: ViewStyle,
  children: any;
}
export default class Projector extends Component<ProjectorProps> {
  static defaultProps = {
    ...ViewBase,
    index: 0,
  };
  private slideShowns: any;
  render() {
    const { index, slideStyle, children, ...others } = this.props;
    let $children: ReactNode[] = [];
    if (!(children instanceof Array)) {
      if (children) {
        $children = [children];
      };
    } else {
      $children = children;
    }
    if (!this.slideShowns || this.slideShowns.length !== $children.length) {
      this.slideShowns = $children.map(item => false);
    }
    return (
      <View {...others}>
        {$children.map((item, i) => {
          let active = (i == index);
          if (active) this.slideShowns[i] = true;
          let renderSlideStyle = [slideStyle, styles.slide, { opacity: active ? 1 : 0 }];
          return (
            <View key={i} style={renderSlideStyle} pointerEvents={active ? 'auto' : 'none'}>
              {this.slideShowns[i] ? item : null}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
