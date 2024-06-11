import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const AddButton: React.FC = () => {
    return (
        <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    plusSign: {
        fontSize: 40,
        color: 'black',
    },
});

export default AddButton;
