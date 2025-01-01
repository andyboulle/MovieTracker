import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TitleCard from './components/TitleCard';
import NavBar from './components/NavBar';
import WatchedView from './components/WatchedView';

function App(): React.JSX.Element {
  let [activeTab, setActiveTab] = useState(<WatchedView />);

  let watchedMovies = [
    { 'Title': 'Movie 1', 'Score': 6.8 },
    { 'Title': 'Movie 2', 'Score': 8.2 },
    { 'Title': 'Movie 3', 'Score': 7.5 }
  ];
  let wantToWatchMovies = [
    { 'Title': 'Movie 4' },
    { 'Title': 'Movie 5' },
    { 'Title': 'Movie 6' }
  ];

  function handleChangeTab(view: React.JSX.Element) {
    setActiveTab(view);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleCardContainer}>
        <TitleCard />
      </View>
      <View style={styles.contentContainer}>
        {activeTab}
      </View>
      <View style={styles.navBarContainer}>
        <NavBar handleChangeTab={handleChangeTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleCardContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 8,
  },
  navBarContainer: {
    flex: 1,
  },
});

export default App;