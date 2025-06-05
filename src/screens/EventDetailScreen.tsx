import React, { useState } from 'react';
import { Platform } from 'react-native';         
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';
import { deleteEvent } from '../services/storage';
import PurpleButton from '../components/PurpleButton';
import ConfirmModal from '../components/ConfirmModal';  

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen({ navigation, route }: Props) {
  const { event } = route.params as { event: Event };
  const [modalVisible, setModalVisible] = useState(false);

  // Abre o modal de confirmação
  const promptDelete = () => {
    setModalVisible(true);
  };

  // Usuário confirmou “Excluir”
  const handleDeleteConfirm = async () => {
    setModalVisible(false);
    await deleteEvent(event.id);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Panorama' }],
    });
  };

  // Usuário cancelou
  const handleDeleteCancel = () => {
    setModalVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('EventEdit', { event });
  };

  return (
    <>
      <Container>
        <Heading>Detalhes do Evento</Heading>

        <Card>
          <Label>Local:</Label>
          <Value>{event.local}</Value>

          <Label>Data:</Label>
          <Value>{new Date(event.data).toLocaleDateString('pt-BR')}</Value>

          <Label>Tempo (h):</Label>
          <Value>{event.tempo}</Value>

          <Label>Prejuízos:</Label>
          <Value style={{ marginBottom: 16 }}>{event.prejuizos}</Value>
        </Card>

        <ButtonRow>
          <PurpleOutlineButton onPress={handleEdit}>
            <OutlineText>Editar</OutlineText>
          </PurpleOutlineButton>

          <PurpleButton title="Excluir" onPress={promptDelete} />
        </ButtonRow>
      </Container>

      {/* =========================
          ConfirmModal para exclusão
          ========================= */}
      <ConfirmModal
        visible={modalVisible}
        message="Tem certeza que deseja remover este evento?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
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

const Card = styled.View`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
`;

const Label = styled.Text`
  font-weight: 600;
  margin-top: 8px;
  font-size: 16px;
`;

const Value = styled.Text`
  font-size: 16px;
  margin-top: 4px;
  color: #333333;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

const PurpleOutlineButton = styled.TouchableOpacity`
  flex: 1;
  background-color: transparent;
  border: 2px solid #6c63ff;
  border-radius: 6px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

const OutlineText = styled.Text`
  color: #6c63ff;
  font-size: 16px;
  font-weight: 500;
`;
