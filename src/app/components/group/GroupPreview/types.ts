import { ImageSourcePropType } from 'react-native';

export type GroupPreviewProps = {
    width: number;
    height: number;
    imageLink: ImageSourcePropType;
    groupName: string;
    groupDescription: string;
    numOfMembers: number;
    onPress: () => void;
};
