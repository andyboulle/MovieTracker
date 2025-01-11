import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native'

interface AddMovieViewProps {
    addMovieToWatched: (title: string, score: number) => void,
    addMovieToWantToWatch: (title: string) => void
}

export default function AddMovieView({ addMovieToWatched, addMovieToWantToWatch }: AddMovieViewProps): React.JSX.Element {
    const [listToAdd, setListToAdd] = useState('watched')
    const [title, setTitle] = useState('')
    const [score, setScore] = useState('')
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)

    function handleAddMovie() {
        if (listToAdd === 'watched') {
            addMovieToWatched(title, parseFloat(score))
            setTitle('')
            setScore('')
        } else {
            addMovieToWantToWatch(title)
            setTitle('')
        }
        setSuccessMessageVisible(true)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Add Movie</Text>
            <Text style={styles.addToText}>Add To:</Text>
            <View style={styles.selectionContainer}>
                <TouchableOpacity 
                    style={styles.selection}
                    onPress={() => setListToAdd('watched')}
                >
                    <Text style={listToAdd === 'watched' ? styles.selectionTextBold : styles.selectionText}>
                        Watched
                    </Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity 
                    style={styles.selection}
                    onPress={() => setListToAdd('wantToWatch')}
                >
                    <Text style={listToAdd === 'wantToWatch' ? styles.selectionTextBold : styles.selectionText}>
                        Want to Watch
                    </Text>
                </TouchableOpacity>
            </View>
            <Text>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder='Title'
            />
            {listToAdd === 'watched' && (
                <View style={styles.inputContainer}>
                    <Text>Score</Text>
                    <TextInput
                        style={styles.input}
                        value={score}
                        onChangeText={setScore}
                        placeholder='Score'
                        keyboardType='numeric'
                    />
                </View>
            )}
            <Button title='Add Movie' onPress={handleAddMovie}/>
            {successMessageVisible && <Text style={styles.successMessage}>Movie added successfully</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    addToText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    selectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    selection: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    selectionText: {
        fontSize: 16,
    },
    selectionTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
    },
});