import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { usePostsByGroup } from '../../../hooks/api/post/usePostsByGroup'; 
import PostPreview from '../PostPreview'; 
import Skeleton from '../../../atoms/Skeleton'; 
import SelectField from '../../../atoms/SelectField'; 
import { GroupPostsProps, PostData, OptionType } from './types';

const sortingOptions = [
  { label: 'Recent', value: 'Recent' },
  { label: 'Popular', value: 'Popular' },
];

const GroupFeed: React.FC<GroupPostsProps> = ({ groupName }) => {
  const { data: queryData, isLoading, isError } = usePostsByGroup(groupName);
  const [selectedSort, setSelectedSort] = useState(sortingOptions[0].value); 

  
  const handleSortChange = (option: OptionType) => {
    setSelectedSort(option.value);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Skeleton variant="rounded" width={350} height={74} />
      </View>
    );
  }

  if (isError || !queryData) {
    return <Text style={styles.errorText}>Group not found or data is unavailable</Text>;
  }

  const data = queryData.data;

  const renderPost = ({ item }: { item: PostData }) => (
    <PostPreview
      width={390}
      height={74}
      imageLink={{ uri: '/이미지' }}
      groupName={groupName}
      title={item.attributes.title}
      contentPreview="몰라몰라몰라몰라요"
      timestamp={new Date(item.attributes.createdAt)}
      numOfLikes={10}
      numOfComments={5}
      authorSchoolName="SFU"
      onPress={() => console.log('Post pressed', item.id)}
    />
  );

  return (
    <View>
      <SelectField label="Sort by" data={sortingOptions} onSelect={handleSortChange} />
      <FlatList
        data={data}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default GroupFeed;
