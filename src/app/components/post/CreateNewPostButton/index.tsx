import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NewPostPopup = function (): JSX.Element {
    const [popupVisible, setPopupVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(200)).current;
    // const navigation = useNavigation();

    const togglePopup = () => {
        if (popupVisible) {
            Animated.timing(slideAnim, {
                toValue: 200,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -18,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
        setPopupVisible(!popupVisible);
    };

    const navigateToNewPost = () => {
        togglePopup();
        alert('navigating to NewPost screen');
    };

    const navigateToNewGroup = () => {
        togglePopup();
        alert('navigating to NewGroup screen');
    };

    return (
        <>
            <TouchableOpacity onPress={togglePopup} style={styles.button}>
                <AntDesign name="pluscircleo" size={40} color="gray" />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={togglePopup}>
                <Animated.View
                    style={[
                        styles.popupContainer,
                        {
                            transform: [{ translateY: slideAnim }],
                            opacity: popupVisible ? 1 : 0,
                            pointerEvents: popupVisible ? 'auto' : 'none',
                        },
                    ]}>
                    <View style={styles.popup}>
                        <TouchableOpacity onPress={navigateToNewPost} style={styles.option}>
                            <Text style={styles.textOption}>New Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToNewGroup} style={styles.option}>
                            <Text style={styles.textOption}>New Group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.textOption} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
            {popupVisible && (
                <TouchableWithoutFeedback onPress={togglePopup}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        top: -10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 40,
    },
    popupContainer: {
        position: 'absolute',
        bottom: 31,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    popup: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '90%',
        height: '100%',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    textOption: {
        fontSize: 18,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default NewPostPopup;
