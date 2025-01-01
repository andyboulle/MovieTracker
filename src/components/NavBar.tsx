import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faSquarePlus, faClock } from '@fortawesome/free-solid-svg-icons';
import WatchedView from './WatchedView';
import AddMovieView from './AddMovieView';
import WantToWatchView from './WantToWatchView';

interface NavBarProps {
    handleChangeTab: (view: React.JSX.Element) => void
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

export default function NavBar({ handleChangeTab }: NavBarProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => handleChangeTab(<WatchedView />)}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <Text>Watched</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handleChangeTab(<AddMovieView />)}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <Text>Add Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => handleChangeTab(<WantToWatchView />)}>
                <FontAwesomeIcon icon={faClock} />
                <Text>Want to Watch</Text>
            </TouchableOpacity>
        </View>
    );
}