import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/inputs/TextField'; 
import { useNavigation } from '@react-navigation/native';


interface VerificationCodeProps {
    navigate: (screenName: string) => void;
  }
  
  const VerificationCode: React.FC<VerificationCodeProps> = ({ navigate }) => {
    const handleNext = () => {
      navigate('IdAndPasswordInput'); 
    };
  return (
    <View style={styles.container}>
      <TextField 
        variant="outlined" 
        placeholder="Verification Code" 
        style={styles.input} />
      <Button text="Next" variant="primary" size="md" onPress={handleNext} />
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

export default VerificationCode;
