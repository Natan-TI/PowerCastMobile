import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';
import { saveEvent } from '../services/storage';
import PurpleButton from '../components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'EventEdit'>;

export default function EventEditScreen({ navigation, route }: Props) {
  const { event } = route.params as { event: Event };

  // Estados iniciais vêm do objeto original
  const [local, setLocal] = useState<string>(event.local);
  const [tempo, setTempo] = useState<string>(String(event.tempo));
  const [prejuizos, setPrejuizos] = useState<string>(event.prejuizos);

  const handleSave = async () => {
    // 1) Validações básicas
    if (!local.trim()) {
      return Alert.alert('Erro', 'Informe um local válido.');
    }
    const num = parseFloat(tempo.replace(',', '.'));
    if (isNaN(num) || num <= 0) {
      return Alert.alert('Erro', 'Informe um tempo válido em horas.');
    }
    if (!prejuizos.trim()) {
      return Alert.alert('Erro', 'Descreva os prejuízos observados.');
    }

    // 2) Monta o objeto atualizado (mantendo id e data originais)
    const updatedEvent: Event = {
      id: event.id,
      data: event.data,
      local: local.trim(),
      tempo: num,
      prejuizos: prejuizos.trim(),
    };

    try {
      // 3) Salva no storage (substitue pelo mesmo ID, e coloca no início da lista)
      await saveEvent(updatedEvent);

      // 4) Volta para Panorama, recarrega lista (sem duplicar nem apagar)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Panorama' }],
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar o evento. Tente novamente.');
    }
  };

  return (
    <Container>
      <Heading>Editar Evento</Heading>

      <Label>Local afetado</Label>
      <Input
        placeholder="Bairro, cidade ou CEP"
        value={local}
        onChangeText={setLocal}
      />

      <Label>Tempo de interrupção (h)</Label>
      <Input
        keyboardType="numeric"
        placeholder="Ex: 2.5"
        value={tempo}
        onChangeText={setTempo}
      />

      <Label>Prejuízos observados</Label>
      <Textarea
        placeholder="Ex: residências alagadas, comércios fechados..."
        value={prejuizos}
        onChangeText={setPrejuizos}
        multiline
        textAlignVertical="top"
      />

      <PurpleButton title="Salvar Alterações" onPress={handleSave} />
    </Container>
  );
}

// === styled-components/native ===

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
    paddingBottom: 32,
  },
})`
  flex: 1;
`;

const Heading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 12px;
`;

const Textarea = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 16px;
  height: 100px;
  margin-bottom: 16px;
`;
