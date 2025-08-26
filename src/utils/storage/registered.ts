import { Registered } from "@/src/types/medicalregistered";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REGISTERED_KEY = "registered";

export async function getRegistered(): Promise<Registered[]> {
  const json = await AsyncStorage.getItem(REGISTERED_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveRegistered(list: Registered[]) {
  await AsyncStorage.setItem(REGISTERED_KEY, JSON.stringify(list));
}

// Consecutivo local (1 a 1)
export async function generateRequestNumber(): Promise<string> {
  const list = await getRegistered();
  if (list.length === 0) return "7000001";
  const max = Math.max(...list.map(reg => Number(reg.noRequest || 0)));
  return (max + 1).toString();
}
