import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface WantToWatchMovieRowProps {
    movie: { id: string, title: string };
    updateMovie: (id: string, title: string) => void;
    deleteMovie: (id: string) => void;
}

export default function WantToWatchMovieRow({ movie, updateMovie, deleteMovie }: WantToWatchMovieRowProps): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(movie.title);

    const handleUpdate = () => {
        if (!title) {
            setTitle(movie.title);
            Alert.alert('Title is required');
            return;
        } else {
            updateMovie(movie.id, title);
            setModalVisible(false);
        }
    };

    const handleDelete = () => {
        deleteMovie(movie.id);
    };

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} color="black" />
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
                            placeholderTextColor="#6e6e6e"
                        />
                        <Button title="Update" onPress={handleUpdate} color="#698F3F" />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#698F3F" />
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
        borderBottomColor: '#698F3F',
        backgroundColor: '#FFFFFF',
    },
    movieTitle: {
        flex: 3,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginHorizontal: 10,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#6e6e6e',
        borderRadius: 5,
        color: '#000000',
    },
});