# Teaset
[🇨🇳中文完整文档版](https://github.com/gyfgyf/react-native-teaset/blob/master/docs/cn/README.md)

A UI library for react native, provides 20+ pure JS(ES6)+typescript components, focusing on content display and action control.

# Installation
```
npm install --save react-native-teaset
npm install --save react-native-legacy-components
```

# Example
Clone teaset project from github (or download zip file):
```
git clone https://github.com/gyfgyf/react-native-teaset.git
cd Example
npm install
```
To run example on iOS:
```
cd ios && pod install && cd ..
react-native run-ios
```
To run example on Android:
```
react-native run-android
```
**Tips: In the Android system, the animations is not smooth, switch to the release mode can be resolved.**

## iPhoneX
iPhoneX and iPhoneXS are fully supported after 0.6.0, and this option is **true** by default.

If SafeAreaView is used, please use ```Theme.set({fitIPhoneX: false})``` to manually turn off it.

## Redux
If you use Redux, you need to use the ```<TopView>``` package container (thanks [@Alexorz](https://github.com/Alexorz) ).

```
import { TopView } from 'react-native-teaset';

container => () => <Provider store={store}><TopView>{container}</TopView></Provider>
```
## change theme 
if you use TeaNavigator change theme use can or setTheme
```
  // Theme.set(item);
  // this.navigator.popToTop();
```
if you use react-navigation change theme,You have to add a BasePage for each page
```
 import {setTheme,BasePage,Button,ConfigProvider} from 'react-native-teaset';
 setTheme(theme:string);
  <ConfigProvider> //add to root view
    <BasePage>
      <Button/>
    </BasePage>
  </ConfigProvider>
 

```

# Documentation
The document is being written, please refer to the example source code.

[Translation project](https://github.com/emersonlaurentino/teaset/projects/1)

# Screenshots

## Components
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/00-Teaset1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/00-Teaset2.png?raw=true)

## Theme
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/00a-Theme1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/00a-Theme2.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/00a-Theme3.png?raw=true)

## Label
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/01-Label.png?raw=true)

## Button
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/02-Button.png?raw=true)

## Checkbox
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/03-Checkbox.png?raw=true)

## Input
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/04-Input.png?raw=true)

## Select
![](./teaset/blob/screenshots/05-Select1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/05-Select2.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/05-Select3.png?raw=true)

## Stepper
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/05a-Stepper.png?raw=true)

## SearchInput
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/05b-SearchInput.png?raw=true)

## Badge
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/06-Badge.png?raw=true)

## Popover
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/07-Popover.png?raw=true)

## NavigationBar
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/08-NavigationBar.png?raw=true)

## ListRow
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/09-ListRow.png?raw=true)

## Carousel
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/10-Carousel.png?raw=true)

## Projector
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/11-Projector.png?raw=true)

## SegmentedBar
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/11a-SegmentedBar1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/11a-SegmentedBar2.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/11a-SegmentedBar3.png?raw=true)

## SegmentedView
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/12-SegmentedView.png?raw=true)

## TabView
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/13-TabView.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/13-TabView2.png?raw=true)

## TransformView
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/14-TransformView.png?raw=true)

## AlbumView
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/14a-AlbumView1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/14a-AlbumView2.png?raw=true)

## Wheel
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/14b-Wheel.png?raw=true)

## Overlay
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay2.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay3.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay6.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay4.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/15-Overlay5.png?raw=true)

## Toast
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/16-Toast1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/16-Toast2.png?raw=true)
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/16-Toast3.png?raw=true)

## ActionSheet
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/17-ActionSheet.png?raw=true)

## ActionPopover
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/18-ActionPopover.png?raw=true)

## PullPicker
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/19-PullPicker.png?raw=true)

## PopoverPicker
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/20-PopoverPicker.png?raw=true)

## Menu
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/20a-Menu1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/20a-Menu2.png?raw=true)

## Drawer
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/20b-Drawer1.png?raw=true) ![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/20b-Drawer2.png?raw=true)

## ModalIndicator
![](https://github.com/gyfgyf/react-native-teaset/blob/master/teaset/screenshots/21-ModalIndicator.png?raw=true)

# License
MIT