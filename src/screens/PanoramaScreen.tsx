import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getEvents, Event } from '../services/storage';
import { RootStackParamList } from '../types/navigation';
import PurpleButton from '@components/PurpleButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Panorama'>;

export default function PanoramaScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Recarrega os eventos toda vez que a tela recebe foco
    const unsubscribe = navigation.addListener('focus', async () => {
      const todos = await getEvents();
      setEvents(todos);
    });
    return unsubscribe;
  }, [navigation]);

  // Renderiza cada item: exibe local, tempo e data. 
  // Ao tocar, navega para EventDetail passando o objeto completo.
  const renderItem: ListRenderItem<Event> = ({ item }) => (
    <Card onPress={() => navigation.navigate('EventDetail', { event: item })}>
      <RowBetween>
        <LocalText numberOfLines={1}>{item.local}</LocalText>
        <TimeText>{item.tempo}h</TimeText>
      </RowBetween>
      <DateText>{new Date(item.data).toLocaleDateString('pt-BR')}</DateText>
    </Card>
  );

  return (
    <Container>
      <Header>
        <Title numberOfLines={3}>Eventos de Falha de Energia</Title>
        <AddButton onPress={() => navigation.navigate('Locations')}>
          <AddButtonText>Registrar Evento</AddButtonText>
        </AddButton>
      </Header>

      <FlatList<Event>
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <CenterContainer>
            <EmptyText>Ainda não há eventos cadastrados.</EmptyText>
          </CenterContainer>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Container>
  );
}

// === styled-components/native ===

// Container principal (sem scroll interno, pois o FlatList já faz isso)
const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
`;

// Header com título e botão
const Header = styled.View`
  width: 100%;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  elevation: 2;           /* sombra leve no Android */
  shadow-color: #000000;  /* sombra leve no iOS */
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

// Texto do título menor para não invadir o botão
const Title = styled.Text`
  flex: 1;                /* ocupa todo espaço restante */
  font-size: 18px;        /* reduzido de 20px para 18px */
  font-weight: bold;
  color: #333333;
  margin-right: 12px;     /* dá espaçamento entre texto e botão */
`;

// Botão “Registrar Evento” estilizado
const AddButton = styled.TouchableOpacity`
  background-color: #6c63ff;  
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-radius: 6px;
`;

// Texto branco dentro do botão
const AddButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

// Container para centralizar mensagem “lista vazia”
const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #999999;
`;

// Cada card do evento
const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-horizontal: 16px;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 8px;

  /* sombra no Android */
  elevation: 2;

  /* sombra no iOS */
  shadow-color: #000000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

// Linha com nome do local e duração
const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// Texto do nome do local
const LocalText = styled.Text`
  flex: 1;              /* para truncar se ficar muito longo */
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`;

// Texto que mostra “2.5h”, “1h” etc.
const TimeText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #6c63ff;
  margin-left: 8px;
`;

// Texto da data (por ex. “04/06/2025”)
const DateText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
`;
