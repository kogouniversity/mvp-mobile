import React from 'react';
import { PostPreviewProps } from './types';
import { unknown } from 'zod';
import { Text, View } from 'react-native';

const PostPreview: React.FC<PostPreviewProps> = function ({
    width,
    height,
    groupName,
    title,
    contentPreview,
    timestamp,
    numOfLikes,
    numOfComments,
    authorSchoolName,
    authorName,
    onPress = () => unknown,
}) {
    return (
      <View>
        <Text>{groupName}</Text>
        <Text>{title}</Text>
        <Text>{contentPreview}</Text>
        <Text>{timestamp.toString()}</Text>
        <Text>{numOfLikes}</Text>
        <Text>{numOfComments}</Text>
        <Text>{authorSchoolName}</Text>
        <Text>hello</Text>
      </View>
    );
  };
  
  export default PostPreview;