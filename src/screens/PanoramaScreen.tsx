import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getEvents } from '../services/storage';
import { Event } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Panorama'>;

export default function PanoramaScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panorama de Eventos</Text>
        <Button title="Registrar Evento" onPress={() => navigation.navigate('Locations')} />
      </View>

      {events.length === 0 ? (
        <View style={styles.center}>
          <Text>Nenhum evento registrado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.local}>{item.local}</Text>
              <Text>Tempo: {item.tempo} h</Text>
              <Text>Data: {new Date(item.data).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  local: { fontSize: 16, fontWeight: '600' },
});
