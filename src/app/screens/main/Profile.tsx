import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Zocial, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import Typography from '../../atoms/Typography';
import { ImageSrcUrl } from '../../utils/images';
import Button from '../../atoms/Button';
import Switch from '../../atoms/Switch';

const styles = StyleSheet.create({
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
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: '100%',
    },
    subHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 2,
    },
    profileEdit: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        borderWidth: 1,
        borderRadius: 999,
        width: 50,
        height: 50,
        marginRight: 5,
    },
    text: {
        paddingLeft: 5,
        width: 'auto',
    },
    darkMode: {
        flexDirection: 'row',
    },
    textWithIcon: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
});
function Profile(): JSX.Element {
    const [isOn, setIsOn] = useState(false);
    const onPress = () => setIsOn(prev => !prev);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typography variant="title" style={styles.headerTitle}>
                    Setting
                </Typography>
            </View>
            <View style={styles.content}>
                <View style={styles.subHeader}>
                    <Typography variant="subtitle">Profile</Typography>
                </View>
                <View style={styles.profileEdit}>
                    <View style={styles.profileInfo}>
                        <Image source={ImageSrcUrl.default_gp as ImageSourcePropType} style={styles.image} />
                        <Typography variant="subtitle" style={styles.text}>
                            Username
                        </Typography>
                        <Typography variant="text" color="subtext" style={styles.text}>
                            SFU
                        </Typography>
                    </View>
                    {/* icon button needed */}
                    <FontAwesome6 name="pencil" size={20} color="black" />
                </View>
                <View style={styles.profileEdit}>
                    <View style={styles.darkMode}>
                        {/* icon button needed */}
                        <Ionicons name="moon" size={18} color="black" />
                        <Button variant="tertiary" size="sm" label="Dark Mode" style={styles.text} />
                    </View>
                    <Switch value={isOn} onSwitch={onPress} />
                </View>
                <View style={styles.textWithIcon}>
                    <Ionicons name="language" size={18} color="black" />
                    <Button variant="tertiary" size="sm" label="Change Language" style={styles.text} />
                </View>
                <View style={styles.textWithIcon}>
                    <FontAwesome name="bell" size={18} color="black" />
                    <Button variant="tertiary" size="sm" label="Notification" style={styles.text} />
                </View>

                <View style={styles.subHeader}>
                    <Typography variant="subtitle">Account</Typography>
                </View>
                <View style={styles.textWithIcon}>
                    <Zocial name="email" size={18} color="black" />
                    <Button variant="tertiary" size="sm" label="Change School Email" style={styles.text} />
                </View>
                <View style={styles.textWithIcon}>
                    <FontAwesome6 name="key" size={18} color="black" />
                    <Button variant="tertiary" size="sm" label="Change Password" style={styles.text} />
                </View>

                <View style={styles.subHeader}>
                    <Typography variant="subtitle">Help</Typography>
                </View>
                <View style={styles.textWithIcon}>
                    <FontAwesome6 name="circle-info" size={18} color="black" />
                    <Button variant="tertiary" size="sm" label="Contact Us" style={styles.text} />
                </View>
            </View>
        </View>
    );
}

export default Profile;
