// Overlay.js

'use strict';

import React, { ReactElement } from "react";

import TopView from './TopView';
import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';
import OverlayPopoverView from './OverlayPopoverView';


class Overlay {

  static View = OverlayView;
  static PullView = OverlayPullView;
  static PopView = OverlayPopView;
  static PopoverView = OverlayPopoverView;

  // base props
  //   style: ViewPropTypes.style,
  //   modal: PropTypes.bool,
  //   animated: PropTypes.bool,
  //   overlayOpacity: PropTypes.number,
  //   overlayPointerEvents: ViewPropTypes.pointerEvents,
  static show(overlayView:ReactElement) {
    let key:number;
    let onDisappearCompletedSave = overlayView.props.onDisappearCompleted;
    let element = React.cloneElement(overlayView, {
      onDisappearCompleted: () => {
        TopView.remove(key);
        onDisappearCompletedSave && onDisappearCompletedSave();
      }
    });
    key = TopView.add(element);
    return key;
  }

  static hide(key:number) {
    TopView.remove(key);
  }

  static transformRoot(transform:any, animated:boolean, animatesOnly = null) {
    TopView.transform(transform, animated, animatesOnly);
  }

  static restoreRoot(animated:boolean, animatesOnly = null) {
    TopView.restore(animated, animatesOnly);
  }

}

export default Overlay;
