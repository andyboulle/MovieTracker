import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native'

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
            if (!title) {
                Alert.alert('Title is required')
                setSuccessMessageVisible(false)
                return
            } else if (!score) {
                Alert.alert('Score is required')
                setSuccessMessageVisible(false)
                return
            } else if (isNaN(parseFloat(score))) {
                Alert.alert('Score must be a number')
                setSuccessMessageVisible(false)
                return
            } else if (parseFloat(score) < 0 || parseFloat(score) > 10) {
                Alert.alert('Score must be between 0 and 10')
                setSuccessMessageVisible(false)
                return
            } else {
                addMovieToWatched(title, parseFloat(score))
                setSuccessMessageVisible(true)
            }
            setTitle('')
            setScore('')
        } else {
            if (!title) {
                Alert.alert('Title is required')
                setSuccessMessageVisible(false)
                return
            } else {
                addMovieToWantToWatch(title)
                setSuccessMessageVisible(true)
            }
            setTitle('')
        }
        setSuccessMessageVisible(true)
    }

    function handleSwitchListToAdd() {
        setListToAdd(listToAdd === 'watched' ? 'wantToWatch' : 'watched')
        setSuccessMessageVisible(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Add Movie</Text>
            <Text style={styles.addToText}>Add To:</Text>
            <View style={styles.selectionContainer}>
                <TouchableOpacity 
                    style={styles.selection}
                    onPress={() => handleSwitchListToAdd()}
                >
                    <Text style={listToAdd === 'watched' ? styles.selectionTextBold : styles.selectionText}>
                        Watched
                    </Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity 
                    style={styles.selection}
                    onPress={() => handleSwitchListToAdd()}
                >
                    <Text style={listToAdd === 'wantToWatch' ? styles.selectionTextBold : styles.selectionText}>
                        Want to Watch
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder='Title'
                placeholderTextColor="#6e6e6e"
            />
            {listToAdd === 'watched' && (
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Score</Text>
                    <TextInput
                        style={styles.input}
                        value={score}
                        onChangeText={setScore}
                        placeholder='Score'
                        placeholderTextColor="#6e6e6e"
                        keyboardType='numeric'
                    />
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleAddMovie}>
                <Text style={styles.buttonText}>Add Movie</Text>
            </TouchableOpacity>
            {successMessageVisible && <Text style={styles.successMessage}>Movie added successfully</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#698F3F',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 65,
        textAlign: 'center',
        marginTop: -35,
        color: '#FFFFFF',
        fontFamily: 'FjallaOne-Regular',
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
        borderColor: '#6e6e6e',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    addToText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        color: '#FFFFFF',
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
        color: '#FFFFFF',
    },
    selectionTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    successMessage: {
        color: '#FFFFFF',
        marginTop: 10,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});