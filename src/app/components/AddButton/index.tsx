import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AddButton: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList, 'CreateNewPost'>>();

    const handlePress = () => {
        navigation.navigate('CreateNewPost');
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
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
    text: {
        fontSize: 40,
        color: 'black',
    },
});

export default AddButton;
