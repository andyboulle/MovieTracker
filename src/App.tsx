import { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import TitleCard from './components/TitleCard';
import NavBar from './components/NavBar';
import WatchedView from './components/WatchedView';
import WantToWatchView from './components/WantToWatchView';
import AddMovieView from './components/AddMovieView';

function App(): React.JSX.Element {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [wantToWatchMovies, setWantToWatchMovies] = useState([]);

  let [activeTab, setActiveTab] = useState(
    <AddMovieView
      addMovieToWatched={handleAddMovieToWatched}
      addMovieToWantToWatch={handleAddToWantToWatch}
    />
  );

  // Load movie lists from storage on app start
  useEffect(() => {
    loadMovieLists();
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, [])

  useEffect(() => {
    storeMovieLists();
  }, [watchedMovies, wantToWatchMovies])

  // Save watched and want to watch movie lists to storage for future use
  function storeMovieLists() {
    AsyncStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    AsyncStorage.setItem('wantToWatchMovies', JSON.stringify(wantToWatchMovies));
  }

  // Load watched and want to watch movie lists from storage
  function loadMovieLists() {
    AsyncStorage.getItem('watchedMovies').then(data => {
      if (data) {
        setWatchedMovies(JSON.parse(data));
      }
    });
    AsyncStorage.getItem('wantToWatchMovies').then(data => {
      if (data) {
        setWantToWatchMovies(JSON.parse(data));
      }
    });
  }

  // Change the active tab to the view passed
  function handleChangeTab(view: React.JSX.Element) {
    setActiveTab(view);
  }

  function handleAddMovieToWatched(title: string, score: number) {
    let newMovie = {
      id: Date.now().toString(), // Use timestamp as a unique id
      title: title,
      score: score
    }
    setWatchedMovies(prevMovies => [...prevMovies, newMovie]);
  }

  function handleAddToWantToWatch(title: string) {
    let newMovie = {
      id: Date.now().toString(), // Use timestamp as a unique id
      title: title
    }
    setWantToWatchMovies(prevMovies => [...prevMovies, newMovie]);
  }

  function handleUpdateWatchedMovie(id: string, title: string, score: number) {
    setWatchedMovies(prevMovies => {
      let updatedMovies = prevMovies.map(movie => {
        if (movie.id === id) {
          return { ...movie, title: title, score: score };
        }
        return movie;
      });
      setActiveTab(
        <WatchedView 
          watchedMovies={updatedMovies} 
          updateMovie={handleUpdateWatchedMovie} 
          deleteMovie={handleDeleteWatchedMovie}
        />
      );
      return updatedMovies;
    });
  }

  // Delete the movie with the passed id from the watched movies list
  function handleDeleteWatchedMovie(id: string) {
    setWatchedMovies(prevMovies => {
      let updatedMovies = prevMovies.filter(movie => movie.id !== id);
      setActiveTab(
        <WatchedView 
          watchedMovies={updatedMovies} 
          updateMovie={handleUpdateWatchedMovie} 
          deleteMovie={handleDeleteWatchedMovie}
        />
      );
      return updatedMovies;
    });
  }

  function handleUpdateWantToWatchMovie(id: string, title: string) {
    setWantToWatchMovies(prevMovies => {
      let updatedMovies = prevMovies.map(movie => {
        if (movie.id === id) {
          return { ...movie, title: title };
        }
        return movie;
      });
      setActiveTab(
        <WantToWatchView 
          wantToWatchMovies={updatedMovies}
          updateMovie={handleUpdateWantToWatchMovie}
          deleteMovie={handleDeleteWantToWatchMovie}
        />
      );
      return updatedMovies;
    });
  }

  // Delete the movie with the passed id from the want to watch list
  function handleDeleteWantToWatchMovie(id: string) {
    setWantToWatchMovies(prevMovies => {
      let updatedMovies = prevMovies.filter(movie => movie.id !== id);
      setActiveTab(
        <WantToWatchView 
          wantToWatchMovies={updatedMovies}
          updateMovie={handleUpdateWantToWatchMovie}
          deleteMovie={handleDeleteWantToWatchMovie}
        />
      );
      return updatedMovies;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitleCard />
      <View style={styles.contentContainer}>
        {activeTab}
      </View>
      <View style={styles.navBarContainer}>
        <NavBar 
          watchedMovies={watchedMovies} 
          wantToWatchMovies={wantToWatchMovies}
          changeTab={handleChangeTab} 
          updateWatchedMovie={handleUpdateWatchedMovie} 
          deleteWatchedMovie={handleDeleteWatchedMovie}
          addMovieToWatched={handleAddMovieToWatched}
          addMovieToWantToWatch={handleAddToWantToWatch}
          updateWantToWatchMovie={handleUpdateWantToWatchMovie}
          deleteWantToWatchMovie={handleDeleteWantToWatchMovie}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#698F3F',
  },
  contentContainer: {
    flex: 8,
  },
  navBarContainer: {
    flex: 1,
  },
});

export default App;