import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PanoramaScreen from './src/screens/PanoramaScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Panorama">
        <Stack.Screen 
          name="Panorama" 
          component={PanoramaScreen} 
          options={{ title: 'Panorama de Eventos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}