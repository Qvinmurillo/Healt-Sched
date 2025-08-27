import { useRegistered } from "@/src/hooks/useMedicalRegistered";
import { Registered } from "@/src/types/medicalregistered";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

function formatDate(iso: string) {
  const d = new Date(iso);
  const fecha = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "long", year: "numeric" }).format(d);
  const hora = new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" }).format(d);
  return `${fecha} ${hora}`;
}

export default function FiledDetailScreen(){
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById } = useRegistered();
  const [item, setItem] = useState<Registered | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { (async () => setItem(await getById(id)))(); }, [id, getById]);

  if (!item) return <Text style={{ padding: 16 }}>No se encontró el radicado.</Text>;

  return (
    <View style={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.title}>No Solicitud: {item.noRequest}</Text>
        <Text style={styles.meta}>Fecha: {formatDate(item.dateISO)}</Text>
        <Text style={styles.meta}>Estado: {item.status}</Text>

        {!!item.notes && (<>
          <View style={{ height: 8 }} />
          <Text style={styles.label}>Observaciones</Text>
          <Text style={styles.value}>{item.notes}</Text>
        </>)}

        <View style={{ height: 12 }} />
        <Pressable style={styles.btn} onPress={() => setVisible(true)}>
          <Text style={{ color: "white", fontWeight: "700" }}>Ver imagen</Text>
        </Pressable>

        <Modal visible={visible} transparent>
          <View style={styles.modalBg}>
            <Image source={{ uri: item.imageUri }} style={styles.img} />
            <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
              <Text style={{ color: "white", fontWeight: "700" }}>Cerrar</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ 
    backgroundColor: "#fff", 
    padding: 16, 
    borderRadius: 12, 
    elevation: 2, 
    borderWidth: 1, 
    borderColor: "#eee" 
  },
  title:{ 
    fontSize: 18, 
    fontWeight: "700" 
  },
  meta:{ 
    color: "#6b7280", 
    fontSize: 12, 
    marginTop: 4 
  },
  label: { 
    fontSize: 12, 
    color: "#6b7280" 
  },
  value: { 
    fontSize: 14, 
    fontWeight: "600", 
    color: "#111827" 
  },

  btn:{ 
    backgroundColor: "#417584", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center" 
  },
  modalBg:{ 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.8)", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 16 
  },
  img:{ 
    width: "100%", 
    height: "70%", 
    resizeMode: "contain", 
    borderRadius: 12, 
    backgroundColor: "#000" 
  },
  closeBtn:{ 
    marginTop: 16, 
    backgroundColor: "#ef4444", 
    padding: 10, 
    borderRadius: 8, 
    alignItems: "center", 
    minWidth: 120 
  },
});