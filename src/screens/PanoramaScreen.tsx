// Supondo que este seja o seu PanoramaScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getEvents, Event } from '../services/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Panorama'>;

export default function PanoramaScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Carrega os eventos toda vez que a tela vem ao foco
    const unsubscribe = navigation.addListener('focus', async () => {
      const todos = await getEvents();
      setEvents(todos);
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // Caso queira ver detalhes, por exemplo
      }}
    >
      <Text style={styles.local}>{item.local}</Text>

      {/* AQUI: você antes tinha styles.subtitle, mas não definiu */}
      <Text style={styles.subtitle}>
        {new Date(item.data).toLocaleDateString('pt-BR')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventos de Falta de Energia</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Locations')}>
          <Text style={styles.addButton}>Registrar Evento</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Ainda não há eventos cadastrados.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    color: '#0066cc',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  local: {
    fontSize: 16,
    fontWeight: '500',
  },
  // ADICIONE ESTA PARTE:
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
