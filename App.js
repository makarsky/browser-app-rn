/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Appbar, BottomNavigation, Text, Colors} from 'react-native-paper';
import { StyleSheet, View, TextInput } from 'react-native';

const App = () => {
  const [currentUrl, setCurrentUrl] = React.useState('https://google.com/aaaaaaaaaaaaaaaaaaaauhviuviuviuvuviuviuviviviyviyvyv');

  const _handleReload = () => console.log('Reload');

  const _handleLoadUrl = () => console.log('Load URL');

  const _handleMore = () => console.log('Shown more');

  const _handleGoBack = () => console.log('Go back');

  const _handleGoForward = () => console.log('Go forward');

  const _handleBoormark = () => console.log('Make a bookmark');

  const _handleBookmarkList = () => console.log('List');

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <TextInput style={styles.urlInput} value={currentUrl} onChangeText={setCurrentUrl} />
        <Appbar.Action icon="arrow-right-bold" onPress={_handleLoadUrl} />
        <Appbar.Action icon="reload" onPress={_handleReload} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <Appbar style={styles.bottomAppbar}>
        <Appbar.Action icon="chevron-left" onPress={_handleGoBack} disabled={true} />
        <Appbar.Action icon="chevron-right" onPress={_handleGoForward} />
        <Appbar.Action icon="bookmark-outline" onPress={_handleBoormark} />
        <Appbar.Action icon="format-list-bulleted" onPress={_handleBookmarkList} />
      </Appbar>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  urlInput: {
    flex: 1,
    height: 40,
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    marginHorizontal: 6,
  },
  bottomAppbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-evenly",
    backgroundColor: Colors.grey100
  },
  view: {
    flex: 1,
  },
});