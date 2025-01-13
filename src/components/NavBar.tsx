import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faSquarePlus, faClock } from '@fortawesome/free-solid-svg-icons';
import WatchedView from './WatchedView';
import AddMovieView from './AddMovieView';
import WantToWatchView from './WantToWatchView';

interface NavBarProps {
    watchedMovies: Array<{ id: string, title: string; score: number }>,
    wantToWatchMovies: Array<{ id: string, title: string }>,
    changeTab: (view: React.JSX.Element) => void,
    updateWatchedMovie: (id: string, title: string, score: number) => void,
    deleteWatchedMovie: (id: string) => void,
    addMovieToWatched: (title: string, score: number) => void,
    addMovieToWantToWatch: (title: string) => void
    updateWantToWatchMovie: (id: string, title: string) => void,
    deleteWantToWatchMovie: (id: string) => void
}

export default function NavBar({ watchedMovies, wantToWatchMovies, changeTab, updateWatchedMovie, deleteWatchedMovie, addMovieToWatched, addMovieToWantToWatch, updateWantToWatchMovie, deleteWantToWatchMovie }: NavBarProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => changeTab(
                    <WatchedView 
                        watchedMovies={watchedMovies} 
                        updateMovie={updateWatchedMovie} 
                        deleteMovie={deleteWatchedMovie}
                    />
                )}
            >
                <FontAwesomeIcon icon={faCircleCheck} color="#FFFFFF" />
                <Text style={styles.tabText}>Watched</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => changeTab(
                    <AddMovieView 
                        addMovieToWatched={addMovieToWatched}
                        addMovieToWantToWatch={addMovieToWantToWatch}
                    />
                )}
            >
                <FontAwesomeIcon icon={faSquarePlus} color="#FFFFFF" />
                <Text style={styles.tabText}>Add Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => changeTab(
                    <WantToWatchView 
                        wantToWatchMovies={wantToWatchMovies}
                        updateMovie={updateWantToWatchMovie}
                        deleteMovie={deleteWantToWatchMovie}
                    />
                )}
            >
                <FontAwesomeIcon icon={faClock} color="#FFFFFF" />
                <Text style={styles.tabText}>Want to Watch</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#5d8038',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#FFFFFF',
        marginTop: 5,
    },
});