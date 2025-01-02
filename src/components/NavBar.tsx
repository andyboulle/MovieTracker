import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faSquarePlus, faClock } from '@fortawesome/free-solid-svg-icons';
import WatchedView from './WatchedView';
import AddMovieView from './AddMovieView';
import WantToWatchView from './WantToWatchView';

interface NavBarProps {
    watchedMovies: Array<{ id: number, title: string; score: number }>;
    changeTab: (view: React.JSX.Element) => void,
    updateMovie: (id: number, title: string, score: number) => void,
    deleteWatchedMovie: (id: number) => void,
    addMovieToWatched: (title: string, score: number) => void,
    addMovieToWantToWatch: (title: string) => void
}

export default function NavBar({ watchedMovies, changeTab, updateMovie, deleteWatchedMovie, addMovieToWatched, addMovieToWantToWatch }: NavBarProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => changeTab(
                    <WatchedView 
                        watchedMovies={watchedMovies} 
                        updateMovie={updateMovie} 
                        deleteMovie={deleteWatchedMovie}
                    />
                )}
            >
                <FontAwesomeIcon icon={faCircleCheck} />
                <Text>Watched</Text>
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
                <FontAwesomeIcon icon={faSquarePlus} />
                <Text>Add Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => changeTab(<WantToWatchView />)}
            >
                <FontAwesomeIcon icon={faClock} />
                <Text>Want to Watch</Text>
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
        backgroundColor: '#f8f8f8',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});