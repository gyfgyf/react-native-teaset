import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter,EmitterSubscription } from 'react-native';
import theme from '../../themes/themeInterface';
import Theme from '../../themes/Theme';
import { Provider } from './context';

export interface ConfigProviderProps {
  children?: React.ReactNode;
  theme?: theme;
}
const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { children, theme } = props;
  let config = { Theme: Object.assign(Theme,theme)};
  const [value, setValue] = useState(config);
  let themeEmitter: EmitterSubscription;
  useEffect(() => {
    themeEmitter = DeviceEventEmitter.addListener('react-native-teaset/changeTheme', (type) => {
      const themes:any = Theme.themes;
      const currentTheme = themes[type];
      Theme.set(currentTheme);
      setValue({ Theme: Theme });
    });
    return () => {
      themeEmitter.remove();
    }
  })

  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};

export default ConfigProvider;
