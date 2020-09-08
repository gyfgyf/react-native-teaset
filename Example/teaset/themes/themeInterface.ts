// ThemeInterface.js

'use strict';
import { ColorValue } from 'react-native';

export interface themeBase{
  //General
  screenColor: ColorValue;
  primaryColor: ColorValue;
  secondaryColor: ColorValue;
  defaultColor: ColorValue;
  defaultTextColor: ColorValue;
  pageColor: ColorValue;
  pixelSize: number;

  //Label - color
  labelTextColor: ColorValue;
  labelTextTitleColor: ColorValue;
  labelTextDetailColor: ColorValue;
  labelTextDangerColor: ColorValue;
  //Label - font size
  labelFontSizeXL: number;
  labelFontSizeLG: number;
  labelFontSizeMD: number;
  labelFontSizeSM: number;
  labelFontSizeXS: number;
  labelTitleScale: number; //29; 22; 15; 11; 9
  labelDetailScale: number; //23; 18; 13; 9; 7
  labelDangerScale: number;

  //Button - background color
  btnColor: ColorValue;
  btnPrimaryColor: ColorValue;
  btnSecondaryColor: ColorValue;
  btnDangerColor: ColorValue;
  btnLinkColor: ColorValue;
  //Button - title color
  btnTitleColor: ColorValue;
  btnPrimaryTitleColor: ColorValue;
  btnSecondaryTitleColor: ColorValue;
  btnDangerTitleColor: ColorValue;
  btnLinkTitleColor: ColorValue;
  //Button - border color
  btnBorderColor: ColorValue;
  btnPrimaryBorderColor: ColorValue;
  btnSecondaryBorderColor: ColorValue;
  btnDangerBorderColor: ColorValue;
  btnLinkBorderColor: ColorValue;
  //Button - border width
  btnBorderWidth: number;
  //Button - border radius
  btnBorderRadiusXL: number;
  btnBorderRadiusLG: number;
  btnBorderRadiusMD: number;
  btnBorderRadiusSM: number;
  btnBorderRadiusXS: number;
  //Button - font size
  btnFontSizeXL: number;
  btnFontSizeLG: number;
  btnFontSizeMD: number;
  btnFontSizeSM: number;
  btnFontSizeXS: number;
  //Button - padding vertical
  btnPaddingVerticalXL: number;
  btnPaddingVerticalLG: number;
  btnPaddingVerticalMD: number;
  btnPaddingVerticalSM: number;
  btnPaddingVerticalXS: number;
  //Button - padding horizontal
  btnPaddingHorizontalXL: number;
  btnPaddingHorizontalLG: number;
  btnPaddingHorizontalMD: number;
  btnPaddingHorizontalSM: number;
  btnPaddingHorizontalXS: number;
  //Button - disabled opacity
  btnDisabledOpacity: number;

  //Checkbox
  cbTitleColor: ColorValue;
  cbFontSizeLG: number;
  cbFontSizeMD: number;
  cbFontSizeSM: number;
  cbTitlePaddingLeftLG: number;
  cbTitlePaddingLeftMD: number;
  cbTitlePaddingLeftSM: number;
  cbCheckedTintColor: ColorValue;
  cbUncheckedTintColor: ColorValue;
  cbIconSizeLG: number;
  cbIconSizeMD: number;
  cbIconSizeSM: number;
  cbDisabledOpacity: number;

  //Input
  inputColor: ColorValue;
  inputTextColor: ColorValue;
  inputPlaceholderTextColor: ColorValue;
  inputBorderColor: ColorValue;
  inputBorderWidth: number;
  //Input - border radius
  inputBorderRadiusLG: number;
  inputBorderRadiusMD: number;
  inputBorderRadiusSM: number;
  //Input - font size
  inputFontSizeLG: number;
  inputFontSizeMD: number;
  inputFontSizeSM: number;
  //Input - padding vertical
  inputPaddingVerticalLG: number;
  inputPaddingVerticalMD: number;
  inputPaddingVerticalSM: number;
  //Input - padding horizontal
  inputPaddingHorizontalLG: number;
  inputPaddingHorizontalMD: number;
  inputPaddingHorizontalSM: number;
  //Input - height
  inputHeightLG: number;
  inputHeightMD: number;
  inputHeightSM: number;
  //Input - disabled opacity
  inputDisabledOpacity: number;

  //Select
  selectColor: ColorValue;
  selectTextColor: ColorValue;
  selectPlaceholderTextColor: ColorValue;
  selectBorderColor: ColorValue;
  selectBorderWidth: number;
  //Select - border radius
  selectBorderRadiusLG: number;
  selectBorderRadiusMD: number;
  selectBorderRadiusSM: number;
  //Select - font size
  selectFontSizeLG: number;
  selectFontSizeMD: number;
  selectFontSizeSM: number;
  //Select - padding vertical
  selectPaddingTopLG: number;
  selectPaddingTopMD: number;
  selectPaddingTopSM: number;
  selectPaddingBottomLG: number;
  selectPaddingBottomMD: number;
  selectPaddingBottomSM: number;
  //Select - padding horizontal
  selectPaddingLeftLG: number;
  selectPaddingLeftMD: number;
  selectPaddingLeftSM: number;
  selectPaddingRightLG: number; //include icon size
  selectPaddingRightMD: number; //include icon size
  selectPaddingRightSM: number; //include icon size
  //Select - height
  selectHeightLG: number;
  selectHeightMD: number;
  selectHeightSM: number;
  //Select - icon
  selectIconSizeLG: number;
  selectIconSizeMD: number;
  selectIconSizeSM: number;
  selectIconTintColor: ColorValue;
  //Select - disabled opacity
  selectDisabledOpacity: number;

  //Stepper
  stepperColor: ColorValue;
  stepperBorderColor: ColorValue;
  stepperBorderWidth: number;
  stepperBorderRadius: number;
  stepperTextColor: ColorValue;
  stepperFontSize: number;
  stepperBtnTextColor: ColorValue;
  stepperBtnFontSize: number;
  stepperValueMinWidth: number;  
  stepperValuePaddingHorizontal: number;
  stepperButtonWidth: number;
  stepperButtonHeight: number;
  stepperDisabledOpacity: number;

  //SearchInput
  siColor: ColorValue;
  siTextColor: ColorValue;
  siPlaceholderTextColor: ColorValue;
  siBorderColor: ColorValue;
  siBorderWidth: number;
  siBorderRadius: number;
  siFontSize: number;
  siPaddingVertical: number;
  siPaddingHorizontal: number;
  siHeight: number;
  siIconSize: number;
  siDisabledOpacity: number;

  //Badge
  badgeSize: number;
  badgeDotSize: number;
  badgePadding: number;
  badgeColor: ColorValue;
  badgeBorderColor: ColorValue;
  badgeBorderWidth: number;
  badgeTextColor: ColorValue;
  badgeFontSize: number;

  //Popover
  popoverColor: ColorValue;
  popoverBorderColor: ColorValue;
  popoverBorderRadius: number;
  popoverBorderWidth: number;
  popoverPaddingCorner: number;

  //NavigationBar
  navType: string;
  navStatusBarStyle: string;
  navBarContentHeight: number;
  navColor: ColorValue;
  navTintColor: ColorValue;
  navTitleColor: ColorValue;
  navTitleFontSize: number;
  navButtonFontSize: number;
  navSeparatorColor: ColorValue;
  navSeparatorLineWidth: number;

  //SegmentedBar
  sbColor: ColorValue;
  sbHeight: number;
  sbBtnPaddingTop: number;
  sbBtnPaddingBottom: number;
  sbBtnPaddingLeft: number;
  sbBtnPaddingRight: number;
  sbBtnTitleColor: ColorValue;
  sbBtnTextFontSize: number;
  sbBtnActiveTitleColor: ColorValue;
  sbBtnActiveTextFontSize: number;
  sbIndicatorLineColor: ColorValue;
  sbIndicatorLineWidth: number;
  sbIndicatorPositionPadding: number;

  //SegmentedView

  //TabView
  tvBarColor: ColorValue;
  tvBarHeight: number;
  tvBarPaddingTop: number;
  tvBarPaddingBottom: number;
  tvBarSeparatorWidth: number;
  tvBarSeparatorColor: ColorValue;
  tvBarBtnWidth: number;
  tvBarBtnIconSize: number;
  tvBarBtnIconTintColor: ColorValue;
  tvBarBtnIconActiveTintColor: ColorValue;
  tvBarBtnTitleColor: ColorValue;
  tvBarBtnTextFontSize: number;
  tvBarBtnActiveTitleColor: ColorValue;
  tvBarBtnActiveTextFontSize: number;

  //ListRow
  rowColor: ColorValue;
  rowMinHeight: number;
  rowPaddingLeft: number;
  rowPaddingRight: number;
  rowPaddingTop: number;
  rowPaddingBottom: number;
  rowIconWidth: number;
  rowIconHeight: number;
  rowIconPaddingRight: number;
  rowAccessoryWidth: number;
  rowAccessoryHeight: number;
  rowAccessoryPaddingLeft: number;
  rowAccessoryCheckColor: ColorValue;
  rowAccessoryIndicatorColor: ColorValue;
  rowSeparatorColor: ColorValue;
  rowSeparatorLineWidth: number;
  rowPaddingTitleDetail: number;
  rowDetailLineHeight: number;
  rowActionButtonColor: ColorValue;
  rowActionButtonDangerColor: ColorValue;
  rowActionButtonTitleColor: ColorValue;
  rowActionButtonDangerTitleColor: ColorValue;
  rowActionButtonTitleFontSize: number;
  rowActionButtonPaddingHorizontal: number;

  //Carousel
  carouselDotSize: number;
  carouselDotUseSize: number;
  carouselDotColor: ColorValue;
  carouselActiveDotColor: ColorValue;

  //Wheel
  wheelColor: ColorValue;
  wheelFontSize: number;
  wheelTextColor: ColorValue;
  wheelHoleHeight: number;
  wheelHoleLineWidth: number;
  wheelHoleLineColor: ColorValue;
  wheelMaskColor: ColorValue;
  wheelMaskOpacity: number;

  //Overlay
  overlayOpacity: number;
  overlayRootScale: number;

  //Toast
  toastColor: ColorValue;
  toastPaddingLeft: number;
  toastPaddingRight: number;
  toastPaddingTop: number;
  toastPaddingBottom: number;
  toastBorderRadius: number;
  toastIconTintColor: ColorValue;
  toastIconWidth: number;
  toastIconHeight: number;
  toastIconPaddingTop: number;
  toastIconPaddingBottom: number;
  toastTextColor: ColorValue;
  toastFontSize: number;
  toastScreenPaddingLeft: number;
  toastScreenPaddingRight: number;
  toastScreenPaddingTop: number;
  toastScreenPaddingBottom: number;

  //ActionSheet
  asItemDisabledOpacity: number;
  asItemMinHeight: number;
  asItemPaddingLeft: number;
  asItemPaddingRight: number;
  asItemPaddingTop: number;
  asItemPaddingBottom: number;
  asItemColor: ColorValue;
  asItemSeparatorColor: ColorValue;
  asItemSeparatorLineWidth: number;
  asItemTitleColor: ColorValue;
  asItemTitleAlign: string;
  asItemFontSize: number;
  asCancelItemColor: ColorValue;
  asCancelItemSeparatorColor: ColorValue;
  asCancelItemSeparatorLineWidth: number;
  asCancelItemTitleColor: ColorValue;
  asCancelItemTitleAlign:string;
  asCancelItemFontSize: number;

  //ActionPopover
  apColor: ColorValue;
  apPaddingVertical: number;
  apPaddingHorizontal: number;
  apBorderRadius: number;
  apDirectionInsets: number;
  apItemTitleColor: ColorValue;
  apItemFontSize: number;
  apItemPaddingVertical: number;
  apItemPaddingHorizontal: number;
  apSeparatorColor: ColorValue;
  apSeparatorWidth: number;  

  //PullPicker
  pupColor:ColorValue;
  pupMaxHeight: number;
  pupHeaderColor: ColorValue;
  pupHeaderPaddingLeft: number;
  pupHeaderPaddingRight: number;
  pupHeaderPaddingTop: number;
  pupHeaderPaddingBottom: number;
  pupHeaderTitleColor: ColorValue;
  pupHeaderFontSize: number;
  pupHeaderFontWeight: string;
  pupHeaderSeparatorColor: ColorValue;
  pupHeaderSeparatorHeight: number;
  pupItemColor: ColorValue;
  pupSeparatorColor: ColorValue;

  //PopoverPicker
  poppColor: ColorValue;
  poppShadowColor: ColorValue;
  poppMinWidth: number;
  poppMaxWidth: number;
  poppMinHeight: number;
  poppMaxHeight: number;
  poppDirectionInsets: number;
  poppItemColor: ColorValue;
  poppItemPaddingLeft: number;
  poppItemPaddingRight: number;
  poppItemPaddingTop: number;
  poppItemPaddingBottom: number;
  poppItemTitleColor: ColorValue;
  poppItemFontSize: number;
  poppItemSeparatorWidth: number;
  poppItemSeparatorColor: ColorValue;
  poppAccessoryWidth: number;
  poppAccessoryHeight: number;
  poppAccessoryPaddingLeft: number;
  poppAccessoryCheckColor: ColorValue;

  //Menu
  menuColor: ColorValue;
  menuShadowColor: ColorValue;
  menuDirectionInsets: number;
  menuItemColor: ColorValue;
  menuItemPaddingLeft: number;
  menuItemPaddingRight: number;
  menuItemPaddingTop: number;
  menuItemPaddingBottom: number;
  menuItemTitleColor: ColorValue;
  menuItemFontSize: number;
  menuItemSeparatorWidth: number;
  menuItemSeparatorColor: ColorValue;
  menuItemIconWidth: number;
  menuItemIconHeight: number;
  menuItemIconColor: ColorValue;
  menuItemIconPaddingRight: number;

  //ModalIndicator
  miIndicatorColor: ColorValue;
  miTextColor: ColorValue;
  miFontSize: number;
  miTextPaddingTop: number;
  miScreenPaddingLeft: number;
  miScreenPaddingRight: number;
  miScreenPaddingTop: number;
  miScreenPaddingBottom: number;

  //NavigationPage
  backButtonTitle: string;
}

interface theme extends themeBase {
  themes: {
    default: themeBase;
    black: themeBase;
    violet: themeBase;
  };
  isPad: boolean;
  isIPhoneX: boolean;
  fitIPhoneX: boolean;
  set: (theme: themeBase) => void;
  statusBarHeight: number|undefined;
  isLandscape: boolean;
  screenInset:{
    left: number;
    right: number;
    top: number| undefined;
    bottom: number;
  };
  
}
export default theme;