import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    navigation: NavigationProp<ParamListBase>;
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingRight: 10,
    },
});

const BackButton: React.FC<Props> = function ({ navigation }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={27} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default BackButton;
