import { Appointment } from "@/src/types/medicalappointments";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APPTS_KEY = "appointments"; 

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const json = await AsyncStorage.getItem(APPTS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.log("getAppointments error:", e);
    return [];
  }
}

export async function saveAppointments(list: Appointment[]) {
  try {
    await AsyncStorage.setItem(APPTS_KEY, JSON.stringify(list));
  } catch (e) {
    console.log("saveAppointments error:", e);
  }
}
