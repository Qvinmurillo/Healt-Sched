import { useAppointments } from "@/src/hooks/useMedicalAppointment";
import { Appointment } from "@/src/types/medicalappointments";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function formatDate(iso: string) {
  try {
    const date = new Date(iso);
    // Formato dd/MM/yyyy
    return new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  } catch {
    return iso;
  }
}

function AppointmentCard({ item }: { item: Appointment }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/clinic/[id]", params: { id: item.id } })}
      style={styles.card}
    >
      <Text style={styles.title}>Cita Médica</Text>
      <View style={{ height: 6 }} />
      <Text style={styles.label}>Especialista</Text>
      <Text style={styles.value}>{item.Especialists}</Text>
      <View style={{ height: 8 }} />
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{formatDate(item.dateISO)}</Text>
    </Pressable>
  );
}

export default function ClinicScreen() {
  const { appointments, loading, reload } = useAppointments();

  // Re-cargar al volver del formulario
  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={appointments}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => <AppointmentCard item={item} />}
      ListEmptyComponent={<Text>No hay citas agendadas.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1, borderColor: "#eee",
  },
  title:{ 
    fontSize: 16, 
    fontWeight: "700" 
  },
  label:{
    fontSize: 12, 
    color: "#6b7280" 
  },
  value:{
    fontSize: 14, 
    fontWeight: "600", 
    color: "#111827" 
  },
});
