import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserInformation } from '../../hooks/api/user/useUserInformation';
import GroupFeed from '../../components/post/GroupFeed/GroupFeed';

const userToken = 'token';

const UserSchoolScreen = () => {
  const { data, isError, error } = useUserInformation(userToken);

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error fetching user information</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading user information...</Text>
      </View>
    );
  }

  return (
    <GroupFeed groupName={data.school.schoolName} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserSchoolScreen;
