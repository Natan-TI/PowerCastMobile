import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export default function LocationsScreen({ navigation }: Props) {
  const [local, setLocal] = useState('');

  // já geramos id/data aqui
  const id = String(Date.now());
  const data = new Date().toISOString();

  const handleNext = () => {
    if (!local.trim()) return alert('Informe um local');
    const partial: Event = { id, data, local, tempo: 0, prejuizos: '' };
    navigation.navigate('Duration', { event: partial });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Local afetado</Text>
      <TextInput
        style={styles.input}
        placeholder="Bairro, cidade ou CEP"
        value={local}
        onChangeText={setLocal}
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
