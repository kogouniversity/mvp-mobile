import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type Props = {
    navigation: NavigationProp<ParamListBase>;
};

const styles = StyleSheet.create({
    button: {
        paddingTop: 3,
        paddingLeft: 27,
    },
});

const BackButton: React.FC<Props> = ({ navigation }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={27} color="#000000" />
        </TouchableOpacity>
    );
};

export default BackButton;
