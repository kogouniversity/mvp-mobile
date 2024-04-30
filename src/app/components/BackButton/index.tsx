import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    navigation: NavigationProp<ParamListBase>;
};

const styles = StyleSheet.create({
    button: {
        paddingTop: 3,
        paddingLeft: 27,
    },
});

const BackButton: React.FC<Props> = function ({ navigation }) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={27} color="#000000" />
        </TouchableOpacity>
    );
};

export default BackButton;
