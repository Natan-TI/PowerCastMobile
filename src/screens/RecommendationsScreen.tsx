import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { saveEvent } from '../services/storage';
import { Event } from '../types';
import { getBairroFromCep } from '@services/cep';
import PurpleButton from '@components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;

export default function RecommendationsScreen({ navigation, route }: Props) {
  const { event } = route.params as { event: Event };

  const handleFinish = async () => {
    try {
      let localFinal = event.local;

      // Se o usuário digitou um CEP, tenta buscar o bairro
      const possivelBairro = await getBairroFromCep(event.local);
      if (possivelBairro) {
        localFinal = possivelBairro;
      }

      // Cria objeto final para salvar
      const eventParaSalvar = { ...event, local: localFinal };
      await saveEvent(eventParaSalvar);

      // Retorna para o Panorama
      alert('Evento salvo com sucesso!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Panorama' }],
      });
    } catch (err) {
      alert('Falha ao salvar o evento. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Heading>Resumo do Evento</Heading>

      <Card>
        <Label>Local:</Label>
        <Value>{event.local}</Value>

        <Label>Tempo (h):</Label>
        <Value>{event.tempo}</Value>

        <Label>Prejuízos:</Label>
        <Value>{event.prejuizos}</Value>
      </Card>

      <Heading>Recomendações</Heading>
      <TextBody>
        • Mantenha lanternas e pilhas reservas sempre à mão.{'\n'}
        • Desligue equipamentos eletrônicos para evitar picos de tensão.{'\n'}
        • Verifique geradores e nobreaks periodicamente.{'\n'}
        • Em caso de tempestades, afaste fiações e não se abrigue debaixo de árvores.
      </TextBody>

      <PurpleButton title="Concluir" onPress={handleFinish} />
    </Container>
  );
}

// === styled-components/native ===

// ScrollView com contentContainerStyle aplicado via attrs
const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
    paddingBottom: 32,
  },
})`
  flex: 1;
`;

const Heading = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Card = styled.View`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 12px;
`;

const Label = styled.Text`
  font-weight: 500;
  margin-top: 8px;
`;

const Value = styled.Text`
  margin-bottom: 4px;
`;

const TextBody = styled.Text`
  line-height: 20px;
  margin-bottom: 24px;
`;
