import { View, Text, FlatList, StyleSheet } from 'react-native'
import WatchedMovieRow from './WatchedMovieRow';

interface WatchedViewProps {
    watchedMovies: Array<{ id: string, title: string; score: number }>,
    updateMovie: (id: string, title: string, score: number) => void,
    deleteMovie: (id: string) => void
}

export default function WatchedView({ watchedMovies, updateMovie, deleteMovie }: WatchedViewProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Watched</Text>
            <FlatList 
                data={watchedMovies} 
                renderItem={({ item }) => 
                    <WatchedMovieRow 
                        movie={item} 
                        updateMovie={updateMovie} 
                        deleteMovie={deleteMovie} 
                    />
                } 
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#698F3F',
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'FjallaOne-Regular',
    }
})