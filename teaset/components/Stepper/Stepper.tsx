// Stepper.js

'use strict';

import React, { Component, ReactElement } from 'react';
import {
  StyleSheet,
  View, Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  LayoutChangeEvent,
  ViewProps,
} from 'react-native';

import Theme from '../../themes/Theme';

interface StepperProps extends ViewProps{
  defaultValue?: number;
  value?: number;
  step: number;
  max: number;
  min: number;
  valueStyle?: TextStyle;
  valueFormat?: (value:number)=>number | string;//(value)
  subButton: ReactElement | string;
  addButton: ReactElement | string;
  showSeparator: boolean;
  disabled: boolean;
  editable: boolean;
  onChange?: (value:number)=>void;//(value)
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: ViewStyle;
  opacity?: number;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
}
interface StepperState {
  value: number;
  height: number;
}
export default class Stepper extends Component<StepperProps,StepperState> {
  static defaultProps = {
    defaultValue: 0,
    step: 1,
    subButton: '－',
    addButton: '＋',
    showSeparator: true,
    disabled: false,
    editable: true,
    min: 1,
    max: Infinity,
  };

  constructor(props:StepperProps) {
    super(props);
    this.state = {
      value: props.value ? props.value : (props.defaultValue ? props.defaultValue : 0),
      height: 0,
    };
  }

  get value() {
    return (this.props.value === undefined ? this.state.value : this.props.value);
  }

  onLayout(e:LayoutChangeEvent) {
    if (this.state.height === null) {
      this.setState({
        height: e.nativeEvent.layout.height,
      });
    }
    this.props.onLayout && this.props.onLayout(e);
  }

  onSubButtonPress() {
    let { step, min, onChange } = this.props;
    let value = this.value;
    value -= step;
    if (value < min) value = min;
    this.setState({ value });
    onChange && onChange(value);
  }

  onAddButtonPress() {
    let { step, max, onChange } = this.props;
    let value = this.value;
    value += step;
    if (value > max) value = max;
    this.setState({ value });
    onChange && onChange(value);
  }

  buildStyle() {
    const { style,disabled, opacity } = this.props;
    return StyleSheet.flatten([styles.container,style,{opacity:disabled ? Theme.stepperDisabledOpacity : opacity}]);
  }

  renderSubButton() {
    let { subButton, disabled, editable, min } = this.props;

    let subDisabled = !editable || this.value <= min;
    let subOpacity = !disabled && subDisabled ? Theme.stepperDisabledOpacity : 1;

    if (!React.isValidElement(subButton)) {
      subButton = (
        <View style={styles.btnStyle}>
          <Text style={styles.btnTextStyle}>{subButton}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity disabled={subDisabled} onPress={() => this.onSubButtonPress()}>
        <View style={{ opacity: subOpacity }}>
          {subButton}
        </View>
      </TouchableOpacity>
    );
  }

  renderAddButton() {
    let { addButton, disabled, editable, max } = this.props;

    let addDisabled = !editable || this.value >= max;
    let addOpacity = !disabled && addDisabled ? Theme.stepperDisabledOpacity : 1;

    if (!React.isValidElement(addButton)) {
      addButton = (
        <View style={styles.btnStyle}>
          <Text style={styles.btnTextStyle}>{addButton}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity disabled={addDisabled} onPress={() => this.onAddButtonPress()}>
        <View style={{ opacity: addOpacity }}>
          {addButton}
        </View>
      </TouchableOpacity>
    );
  }

  renderValue() {
    const { valueStyle, valueFormat } = this.props;
    const styles = StyleSheet.create({
      text:{
        color: Theme.stepperTextColor,
        fontSize: Theme.stepperFontSize,
        textAlign: 'center',
        minWidth: Theme.stepperValueMinWidth,
        paddingHorizontal: Theme.stepperValuePaddingHorizontal,
        ...valueStyle
      }
    });
    return (
      <Text style={styles.text} numberOfLines={1}>
        {valueFormat ? valueFormat(this.value) : this.value}
      </Text>
    );
  }

  render() {
    const { style, children, pointerEvents, defaultValue, value, step, max, min, valueStyle, valueFormat, subButton, addButton, showSeparator, disabled, editable, onLayout, onChange, ...others } = this.props; //disable View.onChange
    const styles = this.buildStyle();
    const separatorStyle = StyleSheet.create({
      separator: {
        backgroundColor: Theme.stepperBorderColor,
        width: Theme.stepperBorderWidth,
        height: this.state.height,
      }
    })
    let separator;
    if (showSeparator) {
      separator = <View style={separatorStyle.separator} />;
    }

    return (
      <View
        style={styles}
        pointerEvents={disabled ? 'none' : pointerEvents}
        onLayout={e => this.onLayout(e)}
        {...others}
      >
        {this.renderSubButton()}
        {separator}
        {this.renderValue()}
        {separator}
        {this.renderAddButton()}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.stepperColor,
    borderColor: Theme.stepperBorderColor,
    borderWidth: Theme.stepperBorderWidth,
    borderRadius: Theme.stepperBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    opacity:1,
  },
  btnStyle:{
    width: Theme.stepperButtonWidth,
    height: Theme.stepperButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: Theme.stepperBtnTextColor,
    fontSize: Theme.stepperBtnFontSize,
  }
});