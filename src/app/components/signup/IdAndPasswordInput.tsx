import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/inputs/TextField'; 


const IdAndPasswordInput: React.FC = () => {
  const handleSubmit = () => {
    console.log("here")
  };

  return (
    <View style={styles.container}>
      <TextField 
        variant="outlined" 
        placeholder="ID" 
        style={styles.input} 
        />
      <TextField 
        variant="outlined" 
        placeholder="Password" 
        secureTextEntry 
        style={styles.input} />
      <Button children="Sign Up" variant="primary" size="md" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
});

export default IdAndPasswordInput;
