import React from 'react';
import { PostPreviewProps } from './types';
import { unknown } from 'zod';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

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
    imageLink,
    onPress = () => unknown,
}) {
    const getMaxTextWidth = (...texts: string[]): number => {
      return Math.max(...texts.map(text => text.length));
    };

    const formatTimeDigits = (value: number): string => {
      return value.toString().padStart(2, '0');
    };


    const rightContainerWidth = getMaxTextWidth(
      `${formatTimeDigits(timestamp.getHours())}:${formatTimeDigits(timestamp.getMinutes())}`,
      `${numOfLikes} ${numOfComments}`,
      `${authorSchoolName} ${authorName}`
    ) * 8; 

    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { width, height }]}>
        <View style={styles.leftContainer}>
          <View style={styles.groupContainer}>
            <Image source={imageLink} style={styles.image} />
            <Text style={styles.normalText}> {groupName}</Text>
          </View>
          <View style={styles.contentContainer}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.normalText}>{contentPreview}</Text>
          </View>
        </View>
        <View style={[styles.rightContainer, { width: rightContainerWidth }]}>
          <View style={styles.textContainer}>
            <Text style={styles.normalText}>{formatTimeDigits(timestamp.getHours())}:{formatTimeDigits(timestamp.getMinutes())}</Text>
            <View style={styles.NumsContainer}>
              <Text style={styles.normalText}>{numOfLikes} </Text>
              <Text style={styles.normalText}>{numOfComments}</Text>
            </View>
            <View style={styles.authorContainer}>
              <View style={styles.authorSchoolNameContainer}>
                <Text style={styles.normalText}>{authorSchoolName}</Text>
              </View>
              <Text style={styles.normalText}> {authorName}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  leftContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  groupContainer: {
    flexDirection: 'row'
  },
  normalText: {
    fontSize: 11,
    color: '#5a5a5a'
  },
  contentContainer: { 
    paddingLeft: 17,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  image: {
    width: 10,
    height: 10,
  },
  rightContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'flex-end',
  },
  NumsContainer: {
    flexDirection: 'row',
  },
  authorContainer:{
    flexDirection: 'row',
  },
  authorSchoolNameContainer: {
    backgroundColor: '#d3d3d3', // 회색 배경
    borderRadius: 42,
    paddingHorizontal: 5.5,
  }
});

export default PostPreview;