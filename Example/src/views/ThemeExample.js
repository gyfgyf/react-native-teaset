// ThemeExample.js

'use strict';

import React from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, PullPicker, setTheme} from '../../teaset';
import { ConfigContext } from '../../teaset/components/config-provider/context'
export default class ThemeExample extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Theme',
    showBackButton: true,
  };
  static contextType = ConfigContext;
  changeTheme=()=> {
    const { Theme } = this.context;
    PullPicker.show(
      'Select theme',
      Object.keys(Theme.themes),
      -1,
      (item, index) => {
        setTheme(item);
        // Theme.set(item);
        // this.navigator.popToTop();
      }
    );
  }

  renderPage() {

    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow
          title='Select theme'
          onPress={this.changeTheme}
          topSeparator='full'
          bottomSeparator='full' />
      </ScrollView>
    );
  }
}
