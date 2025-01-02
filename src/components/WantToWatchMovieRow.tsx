import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface WantToWatchMovieRowProps {
    movie: { id: number, title: string };
    updateMovie: (id: number, title: string) => void;
    deleteMovie: (id: number) => void;
}

export default function WantToWatchMovieRow({ movie, updateMovie, deleteMovie }: WantToWatchMovieRowProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(movie.title);

    const handleUpdate = () => {
        updateMovie(movie.id, title);
        setModalVisible(false);
    };

    const handleDelete = () => {
        deleteMovie(movie.id);
    };

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
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
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
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