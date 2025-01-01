/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import TitleCard from './components/TitleCard';
import NavBar from './components/NavBar';
import WatchedView from './components/WatchedView';

function App(): React.JSX.Element {
  let [activeTab, setActiveTab] = useState(<WatchedView />)

  let watchedMovies = [
    {'Title': 'Movie 1', 'Score': 6.8},
    {'Title': 'Movie 2', 'Score': 8.2},
    {'Title': 'Movie 3', 'Score': 7.5}
  ]
  let wantToWatchMovies = [
    {'Title': 'Movie 4'},
    {'Title': 'Movie 5'},
    {'Title': 'Movie 6'}
  ]

  function handleChangeTab(view: React.JSX.Element) {
    setActiveTab(view)
  }

  return (
    <SafeAreaView>
      <TitleCard />
      {activeTab}
      <NavBar handleChangeTab={handleChangeTab}/>
    </SafeAreaView>
  );
}

export default App;
