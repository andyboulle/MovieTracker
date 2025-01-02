import { View, Text, FlatList } from 'react-native'
import WatchedMovieRow from './WatchedMovieRow';

interface WatchedViewProps {
    watchedMovies: Array<{ id: number, title: string; score: number }>,
    updateMovie: (id: number, title: string, score: number) => void
}

export default function WatchedView({ watchedMovies, updateMovie }: WatchedViewProps): React.JSX.Element {
    return (
        <View>
            <Text>Watched</Text>
            <FlatList 
                data={watchedMovies} 
                renderItem={({ item }) => <WatchedMovieRow movie={item} updateMovie={updateMovie}/>} 
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}