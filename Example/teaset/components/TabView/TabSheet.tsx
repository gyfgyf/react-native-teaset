// TabSheet.js

'use strict';

import React, { Component, ReactElement } from 'react';
import { View,ImageSourcePropType, ViewStyle, ViewProps } from 'react-native';

interface TabSheetProps extends ViewProps{
  type: 'sheet' | 'button';
  title?: ReactElement | string | number;
  icon?:ReactElement | ImageSourcePropType | number;
  activeIcon?: ReactElement | ImageSourcePropType | number;
  iconContainerStyle?: ViewStyle;
  badge?: ReactElement | number;
  onPress?: Function;
  style?: ViewStyle;
}
export default class TabSheet extends Component<TabSheetProps> {

  static defaultProps = {
    type: 'sheet',
    active: false,
  };

  render() {
    const { style, ...others } = this.props;
    const styles = {
      flex: 1,
      ...style
    }
    return <View style={styles} {...others} />;
  }
}
