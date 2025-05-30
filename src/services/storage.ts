import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';

const STORAGE_KEY = 'powercast_events';

export async function getEvents(): Promise<Event[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

export async function saveEvent(ev: Event): Promise<void> {
    const list = await getEvents();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([ev, ...list]));
}

export async function clearEvents(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
}