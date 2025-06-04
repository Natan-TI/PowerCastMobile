import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { saveEvent } from '../services/storage';
import { Event } from '../types';
import { getBairroFromCep } from '@services/cep';

type Props = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;

export default function RecommendationsScreen({ navigation, route }: Props) {
  const { event } = route.params as { event: Event };

 const handleFinish = async () => {
  try {
    let localFinal = event.local;

    // Tenta buscar bairro se user tiver digitado um CEP
    const possivelBairro = await getBairroFromCep(event.local);
    if (possivelBairro) {
      localFinal = possivelBairro; 
    }

    // Cria um novo objeto para persistir, substituindo local por localFinal
    const eventParaSalvar = { ...event, local: localFinal };
    await saveEvent(eventParaSalvar);

    // Volta ao Panorama
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Resumo do Evento</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Local:</Text>
        <Text style={styles.value}>{event.local}</Text>

        <Text style={styles.label}>Tempo (h):</Text>
        <Text style={styles.value}>{event.tempo}</Text>

        <Text style={styles.label}>Prejuízos:</Text>
        <Text style={styles.value}>{event.prejuizos}</Text>
      </View>

      <Text style={styles.heading}>Recomendações</Text>
      <Text style={styles.text}>
        • Mantenha lanternas e pilhas reservas sempre à mão.{'\n'}
        • Desligue equipamentos eletrônicos para evitar picos de tensão.{'\n'}
        • Verifique geradores e nobreaks periodicamente.{'\n'}
        • Em caso de tempestades, afaste fiações e não se abrigue debaixo de árvores.
      </Text>

      <Button title="Concluir" onPress={handleFinish} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    marginBottom: 4,
  },
  text: {
    lineHeight: 20,
    marginBottom: 24,
  },
});
