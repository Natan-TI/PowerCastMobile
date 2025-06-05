import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';

const STORAGE_KEY = 'events';

export async function getEvents(): Promise<Event[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Salva ou atualiza um evento:
 * - Se já existir um evento com esse mesmo `id`, ele será removido do array antigo.
 * - Em seguida, o novo objeto “event” é inserido NO INÍCIO da lista.
 */
export async function saveEvent(event: Event): Promise<void> {
  const all = await getEvents();
  // filtra tudo, exceto o que tiver mesmo id
  const filtered = all.filter(e => e.id !== event.id);
  // coloca o “event” atualizado no começo da lista:
  const updatedList = [event, ...filtered];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
}

export async function deleteEvent(id: string): Promise<void> {
  const all = await getEvents();
  const filtered = all.filter(e => e.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
export { Event };

