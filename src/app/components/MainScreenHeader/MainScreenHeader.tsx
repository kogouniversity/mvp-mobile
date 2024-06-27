import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.iconsContainer}>
                    <FontAwesome name="send-o" size={20} color="black" style={styles.icon} />
                    <Ionicons name="notifications-sharp" size={20} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    logoContainer: {
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    logo: {
        width: 100,
        height: 42,
        resizeMode: 'stretch',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },
});

export default Header;
