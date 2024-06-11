import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';

export function withStatusBar(WrappedComponent: React.ComponentType) {
    return function (props: any) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <WrappedComponent {...props} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
