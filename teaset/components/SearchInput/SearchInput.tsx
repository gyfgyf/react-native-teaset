// SearchInput.js

'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  LayoutAnimation,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  TextInputProperties,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import Theme from '../../themes/Theme';

interface SearchInputProps extends TextInputProperties{
  style?: ViewStyle;
  inputStyle?: TextStyle;
  iconSize?: number;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  pointerEvents?: "none" | "box-none" | "box-only" | "auto" | undefined;
  editable?: boolean;
}
interface SearchInputState{
  editing?: boolean;
  value?: undefined | string;
  width?: number;
  placeholderWidth?: number;
  selectionColor?: string;
}

export default class SearchInput extends Component<SearchInputProps,SearchInputState> {
  static defaultProps = {
    disabled: false,
    underlineColorAndroid: 'rgba(0, 0, 0, 0)',
  };  
  private textInputRef: any;
  constructor(props:SearchInputProps) {
    super(props);
    this.state = {
      value: props.value === undefined ? props.defaultValue : props.value,
      editing: false,
      width: 0,
      placeholderWidth: 0,
      selectionColor: '',
    };
  }

  componentDidUpdate(prevProps:SearchInputProps, prevState:SearchInputState) {
    if (prevState.editing !== this.state.editing) {
      LayoutAnimation.configureNext({
        duration: 500,
        create: {
          duration: 300,
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 200,
        }
      });
    }
  }

  focus() {
    return this.textInputRef && this.textInputRef.focus();
  }

  blur() {
    return this.textInputRef && this.textInputRef.blur();
  }

  isFocused() {
    return this.textInputRef && this.textInputRef.isFocused();
  }

  clear() {
    return this.textInputRef && this.textInputRef.clear();
  }

  onContainerLayout=(e:LayoutChangeEvent)=> {
    this.setState({width: e.nativeEvent.layout.width});
  }

  onPlaceholderLayout=(e:LayoutChangeEvent)=> {
    this.setState({placeholderWidth: e.nativeEvent.layout.width});
  }

  onInputFocus=(e: NativeSyntheticEvent<TextInputFocusEventData>)=> {
    this.setState({editing: true, selectionColor: 'rgba(0, 0, 0, 0)'});
    this.props.onFocus && this.props.onFocus(e);
    setTimeout(() => this.setState({selectionColor: ''}), 500);
  }

  onInputBlur=(e: NativeSyntheticEvent<TextInputFocusEventData>)=> {
    this.setState({editing: false});
    this.props.onBlur && this.props.onBlur(e);
  }

  onChangeText(text:string) {
    this.setState({value: text});
    this.props.onChangeText && this.props.onChangeText(text);
  }

  render() {
    let {
      style,
      children,
      inputStyle,
      iconSize= Theme.siIconSize,
      disabled,
      value=this.state.value,
      placeholder,
      placeholderTextColor,
      selectionColor,
      pointerEvents,
      onBlur,
      onFocus,
      onChangeText,
      ...others
    } = this.props;
    style = StyleSheet.flatten([styles.wrap,style]) 
    if (disabled) {
      style=StyleSheet.flatten([styles.wrap,style,{opacity: Theme.siDisabledOpacity}])
    };

    let height = StyleSheet.flatten(style).height;
    inputStyle = StyleSheet.flatten(
      [
        styles.inputStyle,
        {
          height: height ? height : Theme.siHeight,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }
      ]
    )
    let paddingSize;
    let fs:TextStyle = StyleSheet.flatten(inputStyle);
    if (fs.paddingLeft || fs.paddingLeft === 0) paddingSize = fs.paddingLeft;
    else if (fs.paddingHorizontal || fs.paddingHorizontal === 0) paddingSize = fs.paddingHorizontal;
    else if (fs.padding || fs.padding === 0) paddingSize = fs.padding;
    else paddingSize = 0;

    if (!placeholderTextColor) placeholderTextColor = Theme.siPlaceholderTextColor;
    if (disabled) pointerEvents = 'none';

    return (
      <View style={style} pointerEvents={pointerEvents}>
        <View style={styles.container} onLayout={this.onContainerLayout}>
          <View style={this.state.editing || value ? {width: this.state.width} : null}>
            <View style={styles.placeholderContainer} onLayout={this.onPlaceholderLayout}>
              <View style={{paddingLeft: iconSize * 0.5, alignItems: 'center'}}>
                <Image
                  style={{width: iconSize, height: iconSize, tintColor: placeholderTextColor}}
                  source={require('../../icons/search.png')}
                  />
              </View>
              <Text style={{paddingLeft: paddingSize, color: placeholderTextColor, fontSize: fs.fontSize}}>
                {value ? null : placeholder}
              </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0)', paddingLeft: iconSize * 1.5}}>
          <TextInput
            style={inputStyle}
            value={value}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            onChangeText={text => this.onChangeText(text)}
            selectionColor={this.state.selectionColor ? this.state.selectionColor : selectionColor}
            {...others}
            ref={ref=>(this.textInputRef=ref)}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Theme.siColor,
    borderColor: Theme.siBorderColor,
    borderWidth: Theme.siBorderWidth,
    borderRadius: Theme.siBorderRadius,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    color: Theme.siTextColor,
    fontSize: Theme.siFontSize,
    paddingVertical: Theme.siPaddingVertical,
    paddingHorizontal: Theme.siPaddingHorizontal,
  }
});

