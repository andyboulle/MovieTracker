import { View, Text, FlatList, StyleSheet } from 'react-native'
import WatchedMovieRow from './WatchedMovieRow';

interface WatchedViewProps {
    watchedMovies: Array<{ id: number, title: string; score: number }>,
    updateMovie: (id: number, title: string, score: number) => void,
    deleteMovie: (id: number) => void
}

export default function WatchedView({ watchedMovies, updateMovie, deleteMovie }: WatchedViewProps): React.JSX.Element {
    return (
        <View>
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center'
    }
})