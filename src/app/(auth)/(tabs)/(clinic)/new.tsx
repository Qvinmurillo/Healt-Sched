import DateTimePicker from "@/src/components/DateTimePicker";
import Dropdown from "@/src/components/ui/CustomDropDown";
import ButtonCita from "@/src/components/ui/GenericButton";
import TextField from "@/src/components/ui/TextField";
import { useAppointments } from "@/src/hooks/useMedicalAppointment";
import { Appointment } from "@/src/types/medicalappointments";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuid } from "uuid";

export default function NewScheduleScreen() {
  const { add } = useAppointments();
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<Date | null>(null);

const Especialists_Option = [
  { label: "Medicina General", value: "MCG" },
  { label: "Pediatría", value: "PDT" },
  { label: "Geriatría", value: "GRT" },
  { label: "Neurología", value: "NRG" },
  { label: "Cardiología", value: "CDG" },
  { label: "Psicología", value: "PSG" },
  { label: "Dermatología", value: "DTG" },
  { label: "Odontología", value: "ODG" },
];

const Especialist_Data: Record<string, { duration: number; needsDoctor: boolean }> = {
  MCG: { duration: 15, needsDoctor: true },
  PDT: { duration: 35, needsDoctor: true },
  GRT: { duration: 35, needsDoctor: false },
  NRG: { duration: 50, needsDoctor: true },
  CDG: { duration: 40, needsDoctor: false },
  PSG: { duration: 60, needsDoctor: true },
  DTG: { duration: 30, needsDoctor: true },
  ODG: { duration: 20, needsDoctor: false },
};

const Especialist_Label: Record<string, string> = {
  MCG: "Medicina General",
  PDT: "Pediatría",
  GRT: "Geriatría",
  NRG: "Neurología",
  CDG: "Cardiología",
  PSG: "Psicología",
  DTG: "Dermatología",
  ODG: "Odontología",
};

//No muestra datos hasta seleccionar, Adaptacion para el Dropdown
const [specialistCode, setSpecialistCode] = useState<string | null>(null);

const selectedMeta = specialistCode ? Especialist_Data[specialistCode]: null; 
const selectedLabel = specialistCode ? Especialist_Label [specialistCode] : ""; 

const onSave = async () => {
  if (!date) {
    Alert.alert("Falta la fecha/hora de la cita");
    return;
  }

  const appt: Appointment = {
    id: uuid(),
    title: "Cita Médica",
    Especialists: selectedLabel,
    dateISO: date.toISOString(),
    doctor: doctor || null,
    notes: notes || null,
    created_at: new Date().toISOString(),
  };

  await add(appt);
  router.replace("/(auth)/(tabs)/(clinic)");
};

return (
  <View style={styles.container}>
    <Text style={styles.name}>Especialista</Text>
      <Dropdown
      options={Especialists_Option}
      selectedValue={specialistCode}
      onSelect={setSpecialistCode}
      />
    <View>

    </View>
    <Text style={styles.name}>Nombre del Doctor (opcional)</Text>
    <TextField 
    holder="Ingrese el nombre del doctor" 
    value={doctor} 
    onChangeText={setDoctor}
    />

    <Text style={styles.name}>Fecha y hora</Text>
    <DateTimePicker 
    value={date ?? new Date()} 
    onChange={setDate} 
    mode="datetime" />

    <Text style={{ color: "#6b7280" }}>
      {date ? date.toISOString() : "Sin fecha seleccionada"}
    </Text>

    <Text style={styles.name}>Describa su problema (opcional)</Text>
    <TextField 
    holder="Describa su problema"
    value={notes}
    onChangeText={setNotes}
    style={{height: 60}}
    multiline
    />

    <ButtonCita title="Agendar" onPress={onSave} />
  </View>
);

}

const styles = StyleSheet.create({
  container:{ 
    padding: 16, 
    gap: 12 
  },
  name:{ 
    fontSize: 12, 
    color: "#6b7280" 
  },


});
