import {Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface WatchedMovieRowProps {
    movie: { id: number, title: string, score: number },
    updateMovie: (id: number, title: string, score: number) => void
}

export default function WatchedMovieRow({ movie, updateMovie }: WatchedMovieRowProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(movie.title);
    const [score, setScore] = useState(movie.score.toString());

    const handleUpdate = () => {
        updateMovie(movie.id, title, parseFloat(score));
        setModalVisible(false);
    };
    
    return (
        <View>
            <Text>{movie.title}</Text>
            <Text>{movie.score}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faTrash} />
            </TouchableOpacity>

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
    )
}

const styles = StyleSheet.create({
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