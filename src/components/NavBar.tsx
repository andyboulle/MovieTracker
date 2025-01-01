import { View, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon, Props } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faSquarePlus, faClock } from '@fortawesome/free-solid-svg-icons';
import WatchedView from './WatchedView';
import AddMovieView from './AddMovieView';
import WantToWatchView from './WantToWatchView';

interface NavBarProps {
    handleChangeTab: (view: React.JSX.Element) => void
}

export default function NavBar({ handleChangeTab }: NavBarProps): React.JSX.Element {
    return (
        <View>
            <TouchableOpacity onPress={() => handleChangeTab(<WatchedView />)}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <Text>
                    Watched
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeTab(<AddMovieView />)}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <Text>
                    Add Movie
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeTab(<WantToWatchView />)}>
                <FontAwesomeIcon icon={faClock} />
                <Text>
                    Want to Watch
                </Text>
            </TouchableOpacity>
        </View>
    )
}