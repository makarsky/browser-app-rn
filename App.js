/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Appbar, BottomNavigation, Text} from 'react-native-paper';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const App = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'goBack', title: 'Music', icon: 'album'},
    {key: 'goForward', title: 'Albums', icon: 'album'},
    {key: 'bookmark', title: 'Recents', icon: 'bookmark'},
    {key: 'bookmarks', title: '', icon: 'history'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    goBack: MusicRoute,
    goForward: AlbumsRoute,
    bookmark: RecentsRoute,
    bookmarks: RecentsRoute,
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="reload" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default App;
