import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import TitleCard from './components/TitleCard';
import NavBar from './components/NavBar';
import WatchedView from './components/WatchedView';

function App(): React.JSX.Element {
  const [watchedMovies, setWatchedMovies] = useState([
    { 'id': 1, 'title': 'Movie 1', 'score': 6.8 },
    { 'id': 2, 'title': 'Movie 2', 'score': 8.2 },
    { 'id': 3, 'title': 'Movie 3', 'score': 7.5 }
  ]);
  let wantToWatchMovies = [
    { 'id': 1, 'title': 'Movie 4' },
    { 'id': 2, 'title': 'Movie 5' },
    { 'id': 3, 'title': 'Movie 6' }
  ];

  let [activeTab, setActiveTab] = useState(<WatchedView watchedMovies={watchedMovies} updateMovie={handleUpdateMovie}/>);

  function handleChangeTab(view: React.JSX.Element) {
    setActiveTab(view);
  }

  function handleUpdateMovie(id: number, title: string, score: number) {
    let updatedMovies = watchedMovies.map(movie => {
      if (movie.id === id) {
        return { ...movie, title: title, score: score };
      }
      return movie;
    });
    setWatchedMovies(updatedMovies);
    setActiveTab(<WatchedView watchedMovies={updatedMovies} updateMovie={handleUpdateMovie}/>);
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
        <NavBar watchedMovies={watchedMovies} changeTab={handleChangeTab} updateMovie={handleUpdateMovie} />
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