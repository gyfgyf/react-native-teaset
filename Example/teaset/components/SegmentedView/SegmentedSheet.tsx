// SegmentedSheet.js

'use strict';

import React, { Component, ReactElement } from 'react';
import { View, ViewPropTypes, TextStyle, StyleSheet, ViewStyle } from 'react-native';

interface SegmentedSheetProps {
  title: ReactElement | string | number;
  titleStyle?: TextStyle;
  activeTitleStyle?: TextStyle;
  badge?: ReactElement | string | number;
  style?: ViewStyle;
}
export default class SegmentedSheet extends Component<SegmentedSheetProps> {
  static propTypes = {
    ...ViewPropTypes,
  };

  render() {
    const { style, title, titleStyle, activeTitleStyle, badge, ...others } = this.props;
    const container = StyleSheet.flatten([styles.base, style])
    return <View style={container} {...others} />;
  }
}
const styles = StyleSheet.create({
  base: {
    flexGrow: 1,
  }
})
