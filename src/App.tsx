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
    { 'id': 3, 'title': 'Movie 3', 'score': 7.5 },
    { 'id': 4, 'title': 'Movie 4', 'score': 6.8 },
    { 'id': 5, 'title': 'Movie 5', 'score': 8.2 },
    { 'id': 6, 'title': 'Movie 6', 'score': 7.5 },
    { 'id': 7, 'title': 'Movie 7', 'score': 6.8 },
    { 'id': 8, 'title': 'Movie 8', 'score': 8.2 },
    { 'id': 9, 'title': 'Movie 9', 'score': 7.5 },
    { 'id': 10, 'title': 'Movie 10', 'score': 6.8 },
    { 'id': 12, 'title': 'Movie 11', 'score': 8.2 },
    { 'id': 13, 'title': 'Movie 12', 'score': 7.5 },
    { 'id': 14, 'title': 'Movie 13', 'score': 6.8 },
    { 'id': 15, 'title': 'Movie 14', 'score': 8.2 },
    { 'id': 16, 'title': 'Movie 15', 'score': 7.5 },
    { 'id': 17, 'title': 'Movie 16', 'score': 6.8 },
    { 'id': 18, 'title': 'Movie 17', 'score': 8.2 },
    { 'id': 19, 'title': 'Movie 18', 'score': 7.5 },
    { 'id': 20, 'title': 'Movie 19', 'score': 6.8 },
    { 'id': 21, 'title': 'Movie 20', 'score': 8.2 },
    { 'id': 22, 'title': 'Movie 21', 'score': 7.5 },
  ]);
  let wantToWatchMovies = [
    { 'id': 1, 'title': 'Movie 4' },
    { 'id': 2, 'title': 'Movie 5' },
    { 'id': 3, 'title': 'Movie 6' }
  ];

  let [activeTab, setActiveTab] = useState(
    <WatchedView 
      watchedMovies={watchedMovies} 
      updateMovie={handleUpdateWatchedMovie} 
      deleteMovie={handleDeleteWatchedMovie}
    />
  );

  // Change the active tab to the view passed
  function handleChangeTab(view: React.JSX.Element) {
    setActiveTab(view);
  }

  // Update the passed movie's title and/or score
  // TODO: Add error handling for the following scenarios:
  // 1. If the title is empty
  // 2. If the score is not a number
  // 3. If the score is empty
  // 4. If the score is not between 0 and 10
  // 5. If the title is already in the watched movies list
  function handleUpdateWatchedMovie(id: number, title: string, score: number) {
    let updatedMovies = watchedMovies.map(movie => {
      if (movie.id === id) {
        return { ...movie, title: title, score: score };
      }
      return movie;
    });
    setWatchedMovies(updatedMovies);
    setActiveTab(
      <WatchedView 
        watchedMovies={updatedMovies} 
        updateMovie={handleUpdateWatchedMovie} 
        deleteMovie={handleDeleteWatchedMovie}
      />
    );
  }

  // Delete the movie with the passed id from the watched movies list
  function handleDeleteWatchedMovie(id: number) {
    let updatedMovies = watchedMovies.filter(movie => movie.id !== id);
    setWatchedMovies(updatedMovies);
    setActiveTab(
      <WatchedView 
        watchedMovies={updatedMovies} 
        updateMovie={handleUpdateWatchedMovie} 
        deleteMovie={handleDeleteWatchedMovie}
      />
    );
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
        <NavBar 
          watchedMovies={watchedMovies} 
          changeTab={handleChangeTab} 
          updateMovie={handleUpdateWatchedMovie} 
          deleteWatchedMovie={handleDeleteWatchedMovie}
        />
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