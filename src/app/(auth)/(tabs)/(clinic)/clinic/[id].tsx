import { useAppointments } from "@/src/hooks/useMedicalAppointment";
import { Appointment } from "@/src/types/medicalappointments";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function formatDate(iso: string) {
  const d = new Date(iso);
  const fecha = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
  const hora = new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" }).format(d);
  return `${fecha} ${hora}`;
}

export default function MedicalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById } = useAppointments();
  const [item, setItem] = useState<Appointment | null>(null);

  useEffect(() => {
    (async () => { setItem(await getById(id)); })();
  }, [id, getById]);

  if (!item) return <Text style={{ padding: 16 }}>No se encontró la cita.</Text>;

  return (
    <View style={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Cita Médica</Text>

        <View style={{ height: 10 }} />
        <Text style={styles.label}>Especialista</Text>
        <Text style={styles.value}>{item.Especialists}</Text>

        <View style={{ height: 8 }} />
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>
          {formatDate(item.dateISO)}
        </Text>

        {!!item.doctor && (
          <>
            <View style={{ height: 8 }} />
            <Text style={styles.label}>Doctor</Text>
            <Text style={styles.value}>{item.doctor}</Text>
          </>
        )}

        {!!item.notes && (
          <>
            <View style={{ height: 8 }} />
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.value}>{item.notes}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1, borderColor: "#eee",
  },
  title:{ 
    fontSize: 18, 
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
