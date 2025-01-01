import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    titleCard: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    }
});

export default function TitleCard(): React.JSX.Element {
    return (
        <View>
            <Text style={styles.titleCard}>
                Movie Tracker
            </Text>
        </View>
    )
}