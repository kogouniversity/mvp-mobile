import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type ScreenComponents = {
  [key: string]: React.ComponentType<{ navigate: (screenName: string) => void }>;
};

interface NavigatorProps {
  screens: ScreenComponents;
}

const Stack = createNativeStackNavigator();

const Navigator: React.FC<NavigatorProps> = ({ screens }) => {
  const [currentScreen, setCurrentScreen] = useState(Object.keys(screens)[0]);

  const navigate = (screenName: string) => {
    if (screens[screenName]) {
      setCurrentScreen(screenName);
    } 
  };

  const ScreenComponent = screens[currentScreen];


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={currentScreen}>
          {() => <ScreenComponent navigate={navigate} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default Navigator;
