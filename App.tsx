import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PanoramaScreen from './src/screens/PanoramaScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import DurationScreen from './src/screens/DurationScreen';
import DamagesScreen from './src/screens/DamagesScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';

import { RootStackParamList } from './src/types/navigation';
import EventDetailScreen from '@screens/EventDetailScreen';
import EventEditScreen from '@screens/EventEditScreen';

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
        <Stack.Screen
          name="Locations"
          component={LocationsScreen}
          options={{ title: 'Localização' }}
        />
        <Stack.Screen
          name="Duration"
          component={DurationScreen}
          options={{ title: 'Tempo de Interrupção' }}
        />
        <Stack.Screen
          name="Damages"
          component={DamagesScreen}
          options={{ title: 'Prejuízos Causados' }}
        />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
          options={{ title: 'Recomendações' }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: 'Detalhes do Evento' }}
        />
        <Stack.Screen
          name="EventEdit"
          component={EventEditScreen}
          options={{ title: 'Detalhes do Evento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
