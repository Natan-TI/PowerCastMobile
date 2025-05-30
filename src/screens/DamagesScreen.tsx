import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Event } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Damages'>;

export default function DamagesScreen({ navigation, route }: Props) {
  const { event } = route.params;
  const [prejuizos, setPrejuizos] = useState<string>(event.prejuizos);

  const handleNext = () => {
    if (!prejuizos.trim()) {
      return alert('Descreva os prejuízos observados');
    }
    const updated: Event = { ...event, prejuizos };
    navigation.navigate('Recommendations', { event: updated });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descreva os prejuízos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: residências alagadas, comércios fechados..."
        value={prejuizos}
        onChangeText={setPrejuizos}
        multiline
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
    height: 100,
    marginBottom: 16,
  },
});
