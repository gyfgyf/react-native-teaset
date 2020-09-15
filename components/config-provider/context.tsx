
import React from 'react';
import Theme from '../../themes/Theme';
const ConfigContext = React.createContext({ Theme });
const { Provider, Consumer } = ConfigContext;
export {ConfigContext, Provider, Consumer };
