import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Duration'>;

export default function DurationScreen({ navigation, route }: Props) {
  // Recebe o event parcial de LocationsScreen
  const { event } = route.params;
  const [tempo, setTempo] = useState<string>(String(event.tempo));

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
    <View style={styles.container}>
      <Text style={styles.label}>Tempo de interrupção (h)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 2.5"
        value={tempo}
        onChangeText={setTempo}
      />
      <Button title="Próximo" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
});
