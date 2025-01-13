import { View, Text, StyleSheet } from 'react-native';

export default function TitleCard(): React.JSX.Element {
    return (
        <View>
            <Text style={styles.titleCard}>
                Movie Tracker
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleCard: {
        fontSize: 36,
        fontFamily: 'FjallaOne-Regular',
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#698F3F',
    }
});