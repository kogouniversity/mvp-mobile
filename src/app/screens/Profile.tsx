import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, SafeAreaView, TouchableOpacity } from 'react-native';
import { Zocial, FontAwesome6, Ionicons } from '@expo/vector-icons';
import Typography from '../atoms/Typography';
import { ImageSrcUrl } from '../utils/images';
import Switch from '../atoms/Switch';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../navigator/types';

function Profile(): JSX.Element {
    const [isOn, setIsOn] = useState(false);
    const onPress = () => setIsOn(prev => !prev);
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList, 'MyPosts'>>();

    const handlePress = () => {
        navigation.navigate('MyPosts');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Typography variant="title" style={styles.headerTitle}>
                        Profile
                    </Typography>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitleWrapper}>
                        <Typography variant="subtitle" style={styles.sectionTitle}>
                            General
                        </Typography>
                        <View style={styles.horizontalLine}></View>
                    </View>
                    <View style={styles.profileEdit}>
                        <View style={styles.profileInfo}>
                            <Image source={ImageSrcUrl.default_gp as ImageSourcePropType} style={styles.image} />
                            <View>
                                <Typography variant="subtitle" style={styles.text}>
                                    Username
                                </Typography>
                                <Typography variant="text" color="subtext" style={styles.text}>
                                    SFU
                                </Typography>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <FontAwesome6 name="pencil" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.textWithIcon} onPress={onPress}>
                        <Ionicons name="notifications" size={18} color="black" />
                        <Typography variant="text" style={styles.text}>
                            Notifications
                        </Typography>
                        <View style={styles.switchWrapper}>
                            <Switch value={isOn} onSwitch={onPress} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleWrapper}>
                        <Typography variant="subtitle" style={styles.sectionTitle}>
                            Account
                        </Typography>
                        <View style={styles.horizontalLine}></View>
                    </View>
                    <TouchableOpacity style={styles.textWithIcon}>
                        <Zocial name="email" size={18} color="black" />
                        <Typography variant="text" style={styles.text}>
                            Change Email
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWithIcon}>
                        <FontAwesome6 name="key" size={18} color="black" />
                        <Typography variant="text" style={styles.text}>
                            Change Password
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleWrapper}>
                        <Typography variant="subtitle" style={styles.sectionTitle}>
                            Post
                        </Typography>
                        <View style={styles.horizontalLine}></View>
                    </View>
                    <TouchableOpacity style={styles.textWithIcon} onPress={handlePress}>
                        <FontAwesome6 name="list" size={18} color="black" />
                        <Typography variant="text" style={styles.text}>
                            My Posts
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleWrapper}>
                        <Typography variant="subtitle" style={styles.sectionTitle}>
                            Support
                        </Typography>
                        <View style={styles.horizontalLine}></View>
                    </View>
                    <TouchableOpacity style={styles.textWithIcon}>
                        <FontAwesome6 name="circle-info" size={18} color="black" />
                        <Typography variant="text" style={styles.text}>
                            Help Center
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.textWithIcon}>
                        <Typography variant="text" style={styles.logout}>
                            Logout
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWithIcon}>
                        <Typography variant="text" style={styles.deleteAccount}>
                            Delete Account
                        </Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'lightgrey',
        marginLeft: 10,
    },
    profileEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        borderWidth: 1,
        borderRadius: 999,
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        paddingLeft: 10,
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    switchWrapper: {
        marginLeft: 'auto',
    },
    logout: {
        color: 'red',
    },
    deleteAccount: {
        color: 'red',
    },
});

export default Profile;
