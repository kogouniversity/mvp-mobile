import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { SwitchProps } from './types';

const styles = StyleSheet.create({
    container: {
        borderRadius: 99,
        backgroundColor: '#d3d3d3',
        width: 50,
        height: 25,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },

    on: {
        alignItems: 'flex-start',
    },

    off: {
        alignItems: 'flex-end',
    },

    onCircle: {
        width: 20,
        height: 20,
        backgroundColor: 'green',
        borderRadius: 99,
    },

    offCircle: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 99,
    },
});

const Switch: React.FC<SwitchProps> = function ({ value, onSwitch, style }) {
    return (
        <TouchableOpacity
            onPress={onSwitch}
            style={value ? [styles.container, styles.on] : [styles.container, styles.off]}>
            <View style={value ? styles.onCircle : styles.offCircle} />
        </TouchableOpacity>
    );
};

export default Switch;
