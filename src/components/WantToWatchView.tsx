import { View, Text, FlatList, StyleSheet } from 'react-native'
import WantToWatchMovieRow from './WantToWatchMovieRow'

interface WantToWatchViewProps {
    wantToWatchMovies: Array<{ id: string, title: string }>,
    updateMovie: (id: string, title: string) => void,
    deleteMovie: (id: string) => void
}

export default function WantToWatchView({ wantToWatchMovies, updateMovie, deleteMovie }: WantToWatchViewProps): React.JSX.Element {
    return (
        <View>
            <Text style={styles.sectionTitle}>Want to Watch</Text>
            <FlatList 
                data={wantToWatchMovies} 
                renderItem={({ item }) => 
                    <WantToWatchMovieRow 
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