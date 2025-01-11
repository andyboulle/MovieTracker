import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface WatchedMovieRowProps {
    movie: { id: number, title: string, score: number },
    updateMovie: (id: number, title: string, score: number) => void,
    deleteMovie: (id: number) => void
}

export default function WatchedMovieRow({ movie, updateMovie, deleteMovie }: WatchedMovieRowProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(movie.title);
    const [score, setScore] = useState(movie.score.toString());

    function handleUpdate() {
        if (!title) {
            setTitle(movie.title);
            setScore(movie.score.toString());
            Alert.alert('Title is required');
            return;
        } else if (!score) {
            setTitle(movie.title);
            setScore(movie.score.toString());
            Alert.alert('Score is required');
            return;
        } else if (isNaN(parseFloat(score))) {
            setTitle(movie.title);
            setScore(movie.score.toString());
            Alert.alert('Score must be a number');
            return;
        } else if (parseFloat(score) < 0 || parseFloat(score) > 10) {
            setTitle(movie.title);
            setScore(movie.score.toString());
            Alert.alert('Score must be between 0 and 10');
            return;
        } else {
            updateMovie(movie.id, title, parseFloat(score));
            setModalVisible(false);
        }
    };

    function handleDelete() {
        deleteMovie(movie.id);
    }

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieScore}>{movie.score}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <FontAwesomeIcon icon={faTrash} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Title"
                        />
                        <TextInput
                            style={styles.input}
                            value={score}
                            onChangeText={setScore}
                            placeholder="Score"
                            keyboardType="numeric"
                        />
                        <Button title="Update" onPress={handleUpdate} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    movieTitle: {
        flex: 3,
        fontSize: 16,
    },
    movieScore: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        marginRight: 10, // Add margin to separate from icons
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});