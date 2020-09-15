// TeaNavigator.js

'use strict';

import React, {Component, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import TeaNavigatorScene from './TeaNavigatorScene';

import { Navigator } from 'react-native-legacy-components';

import {setNavigator} from '../../util/navigatorServer'
//replace NavigatorScene, optimize the effect of the scene
Navigator.SceneConfigs = TeaNavigatorScene;

interface TeaNavigatorProps{
  rootView: ReactNode;
}
export default class TeaNavigator extends Component<TeaNavigatorProps> {
  static propTypes = {
    rootView: PropTypes.element,
  };

  static defaultProps = {
    rootView: (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 36, padding: 10}}>Teaset</Text>
        <Text style={{fontSize: 13, padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>Set TeaNavigator.rootView to show main page.{'\n\n'}</Text>
          <Text style={{color: '#ff7800'}}>class</Text> <Text style={{color: '#3b5bb5'}}>Application</Text> <Text style={{color: '#ff7800'}}>extends</Text> Component{' {\n\n'}
          {'  '}<Text style={{color: '#3b5bb5'}}>render</Text>(){' {\n'}
          {'    '}<Text style={{color: '#ff7800'}}>return</Text> {'<TeaNavigator rootView={YourRootView} />;\n'}
          {'  }\n\n'}
          {'}'}
        </Text>
      </View>
    )
  };

  static SceneConfigs = TeaNavigatorScene;
  private navigator: any;
  getRef = (ref:any) => {
    this.navigator = ref;
    setNavigator(ref);
  }
  render() {
    const {rootView} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Navigator
          initialRoute={{
            view: rootView, //the view element, like <View />
            scene: null, //navigate scene, null able
           
          }}
          configureScene={(route:any) => {
            if (route.scene) return route.scene;
            else if (route.view.props.scene) return route.view.props.scene;
            else return TeaNavigatorScene.PushFromRight;
          }}
          renderScene={(route:any, navigator:any) => {
            return React.cloneElement(route.view, {ref: (v:any) => route.viewRef = v});
          }}
          onDidFocus={(route:any) => {
            route.viewRef && route.viewRef.onDidFocus && route.viewRef.onDidFocus();
          }}
          onWillFocus={(route:any) => {
            route.viewRef && route.viewRef.onWillFocus && route.viewRef.onWillFocus();
          }}
          ref={this.getRef}
        />
      </View>
    );
  }
}
