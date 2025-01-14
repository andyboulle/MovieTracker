import { View, Text, StyleSheet } from 'react-native';

export default function TitleCard(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.titleCard}>
                Movie Tracker
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#698F3F',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    titleCard: {
        fontSize: 36,
        fontFamily: 'FjallaOne-Regular',
        textAlign: 'center',
        color: '#FFFFFF',
    }
});