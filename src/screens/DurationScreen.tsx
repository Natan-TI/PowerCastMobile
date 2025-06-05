import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';
import PurpleButton from '@components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Duration'>;

export default function DurationScreen({ navigation, route }: Props) {
  // Recebe o event parcial de LocationsScreen
  const { event } = route.params;
  const [tempo, setTempo] = useState<string>('');

  const handleNext = () => {
    const num = parseFloat(tempo.replace(',', '.'));
    if (isNaN(num) || num <= 0) {
      return alert('Informe um tempo válido em horas');
    }
    // Atualiza o objeto e envia adiante
    const updated: Event = { ...event, tempo: num };
    navigation.navigate('Damages', { event: updated });
  };

  return (
    <Container>
      <Label>Tempo de interrupção (h)</Label>

      <Input
        keyboardType="numeric"
        placeholder="Ex: 2.5"
        value={tempo}
        onChangeText={setTempo}
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
  margin-bottom: 16px;
`;
