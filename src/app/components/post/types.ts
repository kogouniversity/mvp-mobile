export type PostPreviewProps = {
    width: number;
    height: number;
    groupName: string;
    title: string;
    contentPreview: string;
    timestamp: Date;
    numOfLikes: number;
    numOfComments: number;
    authorSchoolName: string;
    authorName: string;
    onPress: () => void;
  }
