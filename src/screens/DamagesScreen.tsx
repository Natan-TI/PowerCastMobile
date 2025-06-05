// src/screens/DamagesScreen.tsx
import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';
import PurpleButton from '@components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Damages'>;

export default function DamagesScreen({ navigation, route }: Props) {
  const { event } = route.params;
  const [prejuizos, setPrejuizos] = useState<string>(event.prejuizos);

  const handleNext = () => {
    if (!prejuizos.trim()) {
      return alert('Descreva os prejuízos observados');
    }
    const updated: Event = { ...event, prejuizos };
    navigation.navigate('Recommendations', { event: updated });
  };

  return (
    <Container>
      <Label>Descreva os prejuízos</Label>
      <Input
        placeholder="Ex: residências alagadas, comércios fechados..."
        value={prejuizos}
        onChangeText={setPrejuizos}
        multiline
      />
      <PurpleButton title="Próximo" onPress={handleNext} />
    </Container>
  );
}

// === styled-components/native ===

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 8px;
  height: 100px;
  margin-bottom: 16px;
`;
