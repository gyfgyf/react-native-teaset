// Label.js

'use strict';

import React, {Component} from "react";
import {Text, TextStyle} from 'react-native';

import Theme from '../../themes/Theme';

interface LabelProps{
  style?:TextStyle,
  type: 'default' | 'title' | 'detail' | 'danger';
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  text?: number | string;
}

export default class Label extends Component<LabelProps> {
  static defaultProps = {
    type: 'default',
    size: 'md',
    numberOfLines: 1,
  };

  buildStyle() {
    const {type, size, style} = this.props;
    let color, fontSize;
    switch (size) {
      case 'xl': fontSize = Theme.labelFontSizeXL; break;
      case 'lg': fontSize = Theme.labelFontSizeLG; break;
      case 'sm': fontSize = Theme.labelFontSizeSM; break;
      case 'xs': fontSize = Theme.labelFontSizeXS; break;
      default: fontSize = Theme.labelFontSizeMD;
    }
    switch (type) {
      case 'title':
        color = Theme.labelTextTitleColor;
        fontSize = Math.round(fontSize * Theme.labelTitleScale);
        break;
      case 'detail':
        color = Theme.labelTextDetailColor;
        fontSize = Math.round(fontSize * Theme.labelDetailScale);
        break;
      case 'danger':
        color = Theme.labelTextDangerColor;
        fontSize = Math.round(fontSize * Theme.labelDangerScale);
        break;
      default:
        color = Theme.labelTextColor;
    }
    const styles:TextStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: color,
      fontSize: fontSize,
      overflow: 'hidden',
      ...style,
    };
    return styles;
  }

  render() {
    const {style, type, size, text, children, ...others} = this.props;
    return (
      <Text style={this.buildStyle()} {...others}>
        {(text || text === '' || text === 0) ? text : children}
      </Text>
    );
  }
}
