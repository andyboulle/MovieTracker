import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TitleCard from './components/TitleCard';
import NavBar from './components/NavBar';
import WatchedView from './components/WatchedView';
import WantToWatchView from './components/WantToWatchView';

function App(): React.JSX.Element {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [wantToWatchMovies, setWantToWatchMovies] = useState([]);

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

  function handleAddMovieToWatched(title: string, score:number) {
    let newMovie = {
      id: watchedMovies.length + 2,
      title: title,
      score: score
    }
    setWatchedMovies([...watchedMovies, newMovie]);
  }

  function handleAddToWantToWatch(title: string) {
    let newMovie = {
      id: wantToWatchMovies.length + 2,
      title: title
    }
    setWantToWatchMovies([...wantToWatchMovies, newMovie]);
  }

  // Update the passed movie's title and/or score in watched movies list
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

  // Update the passed movie's title in want to watch list
  // TODO: Add error handling for the following scenarios:
  // 1. If the title is empty
  // 2. If the title is already in the want to watch movies list
  function handleUpdateWantToWatchMovie(id: number, title: string) {
    let updatedMovies = wantToWatchMovies.map(movie => {
      if (movie.id === id) {
        return { ...movie, title: title };
      }
      return movie;
    });
    setWantToWatchMovies(updatedMovies);
    setActiveTab(
      <WantToWatchView 
        wantToWatchMovies={updatedMovies}
        updateMovie={handleUpdateWantToWatchMovie}
        deleteMovie={handleDeleteWantToWatchMovie}
      />
    )
  }

  // Delete the movie with the passed id from the want to watch list
  function handleDeleteWantToWatchMovie(id: number) {
    let updatedMovies = wantToWatchMovies.filter(movie => movie.id !== id);
    setWantToWatchMovies(updatedMovies);
    setActiveTab(
      <WantToWatchView 
        wantToWatchMovies={updatedMovies}
        updateMovie={handleUpdateWantToWatchMovie}
        deleteMovie={handleDeleteWantToWatchMovie}
      />
    )
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