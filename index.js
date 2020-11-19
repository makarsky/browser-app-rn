/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import { DefaultTheme, Colors, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.blue500,
    },
};

export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App/>
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
