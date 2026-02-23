/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Appbar, Colors, Menu, Button, IconButton} from 'react-native-paper';
import {Dimensions, StyleSheet, View, TextInput, StatusBar, Provider} from 'react-native';
import WebView from 'react-native-webview';
import Bookmark from './src/models/Bookmark';

const screen = Dimensions.get('screen');
const defaultUrl = 'https://www.google.com/';
const defaultUrlTitle = 'Google';

const App = () => {
  const [currentUrl, setCurrentUrl] = React.useState(defaultUrl);
  const [cachedUrl, setCachedUrl] = React.useState(defaultUrl);
  const [urlTitle, setUrlTitle] = React.useState(defaultUrlTitle);
  const [isCurrentUrlDirty, setIsCurrentUrlDirty] = React.useState(false);
  const [webviewProgressBarValue, setWebviewProgressBarValue] = React.useState(
    0,
  );
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);
  let webview = null;
  let urlInput = null;

  const _reloadPage = () => {
    _closeMenu();
    webview.reload()
  };

  const _handleLoadUrl = () => setCachedUrl(currentUrl);

  const _handleMore = () => console.log('Shown more');

  const _handleGoBack = () => webview.goBack();

  const _handleGoForward = () => webview.goForward();

  const _isCachedUrlInBookmarks = () => {
    return bookmarks.some((bookmark) => bookmark.url === cachedUrl);
  };

  const _addBookmark = () => {
    if (!_isCachedUrlInBookmarks()) {
      setBookmarks([new Bookmark(urlTitle, cachedUrl), ...bookmarks]);
    }
  };

  const _removeBookmark = () => {
    if (_isCachedUrlInBookmarks()) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.url !== cachedUrl));
    }
  };

  const _handleBookmarkList = () => console.log('List');

  const _handleWebViewNavigationStateChange = (newNavState) => {};

  const _onLoadStart = (event) => {
    setCurrentUrl(event.nativeEvent.url);
    setIsCurrentUrlDirty(currentUrl !== cachedUrl);
    setUrlTitle(event.nativeEvent.title);

    // TODO: Smoothly show progress bar
  };

  const _onLoadEnd = (event) => {
    // console.log(event.nativeEvent.loading);
    setUrlTitle(event.nativeEvent.title);
    setCanGoBack(event.nativeEvent.canGoBack);
    setCanGoForward(event.nativeEvent.canGoForward);
    setWebviewProgressBarValue(0);

    // TODO: Smoothly hide progress bar
  };

  const _onLoadProgress = (event) => {
    setWebviewProgressBarValue(screen.width * event.nativeEvent.progress);
  };

  const _onChangeCurrentUrl = (changedUrl) => {
    console.log(changedUrl);
    console.log(cachedUrl);
    setIsCurrentUrlDirty(changedUrl !== cachedUrl);
    setCurrentUrl(changedUrl);
  };

  const _onSubmitCurrentUrl = (event) => {
    setCachedUrl(event.nativeEvent.text);
  };

  const _renderUrlControls = () => {
    if (isCurrentUrlDirty) {
      return <Appbar.Action icon="arrow-right-bold" onPress={_handleLoadUrl} />;
    } else {
      return <Appbar.Action icon="reload" onPress={_reloadPage} />;
    }
  };

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const _openMenu = () => setIsMenuVisible(true);

  const _closeMenu = () => setIsMenuVisible(false);


  return (
    <View style={styles.view}>
      <StatusBar backgroundColor={Colors.blue600} />
      <Appbar.Header>
        <TextInput
          ref={(ref) => (urlInput = ref)}
          style={styles.urlInput}
          value={currentUrl}
          autoCorrect={false}
          onChangeText={_onChangeCurrentUrl}
          onSubmitEditing={_onSubmitCurrentUrl}
        />
        {_renderUrlControls()}
        
        <View>
        <Menu
          visible={isMenuVisible}
          onDismiss={_closeMenu}
          anchor={<Appbar.Action color={Colors.white} icon="dots-vertical" onPress={_openMenu} />}>
          <Menu.Item onPress={_reloadPage} title="Refresh" />
          <Menu.Item onPress={() => {}} title="Bookmarks" />
        </Menu>
      </View>
      </Appbar.Header>
      <View style={styles.view}>
        <WebView
          go
          ref={(ref) => (webview = ref)}
          source={{uri: cachedUrl}}
          onLoadStart={_onLoadStart}
          onLoadEnd={_onLoadEnd}
          onLoadProgress={_onLoadProgress}
          onNavigationStateChange={_handleWebViewNavigationStateChange}
        />
        <View
          style={{
            ...styles.webviewProgressBar,
            width: webviewProgressBarValue,
          }}
        />
      </View>
      <Appbar style={styles.bottomAppbar}>
        <Appbar.Action
          icon="chevron-left"
          onPress={_handleGoBack}
          disabled={!canGoBack}
        />
        <Appbar.Action
          icon="chevron-right"
          onPress={_handleGoForward}
          disabled={!canGoForward}
        />
        {!_isCachedUrlInBookmarks() && (
          <Appbar.Action icon="bookmark-outline" onPress={_addBookmark} />
        )}
        {_isCachedUrlInBookmarks() && (
          <Appbar.Action icon="bookmark" onPress={_removeBookmark} />
        )}
        <Appbar.Action
          icon="format-list-bulleted"
          onPress={_handleBookmarkList}
        />
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
    height: 48,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
  },
  view: {
    flex: 1,
    position: 'relative',
  },
  webviewProgressBar: {
    position: 'absolute',
    backgroundColor: Colors.blue300,
    zIndex: 9,
    height: 4,
  },
});
