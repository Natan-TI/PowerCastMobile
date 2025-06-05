import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';
import PurpleButton from '@components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export default function LocationsScreen({ navigation }: Props) {
  const [local, setLocal] = useState('');
  const id = String(Date.now());
  const data = new Date().toISOString();

  const handleNext = () => {
    if (!local.trim()) return alert('Informe um local');
    const partial: Event = { id, data, local, tempo: 0, prejuizos: '' };
    navigation.navigate('Duration', { event: partial });
  };

  return (
    <Container>
      <Label>Local afetado</Label>

      <Input
        placeholder="Bairro, cidade ou CEP"
        value={local}
        onChangeText={setLocal}
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
