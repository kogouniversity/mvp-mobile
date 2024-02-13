import { ImageSourcePropType } from 'react-native';

export type PostPreviewProps = {
    width: number;
    height: number;
    imageLink: ImageSourcePropType;
    groupName: string;
    title: string;
    contentPreview: string;
    timestamp: Date;
    numOfLikes: number;
    numOfComments: number;
    authorSchoolName: string;
    onPress: () => void;
};
