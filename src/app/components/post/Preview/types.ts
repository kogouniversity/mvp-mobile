import { ImageSourcePropType } from 'react-native';

export type PostPreviewProps = {
    width: number;
    height: number;
    imageLink: ImageSourcePropType;
    imagesUrl: string[];
    groupName: string | undefined;
    title: string;
    contentPreview: string;
    timestamp: Date;
    numOfLikes: number;
    numOfComments: number;
    userName: string;
    authorSchoolName: string;
    postId: string;
    onPress: () => void;
};
