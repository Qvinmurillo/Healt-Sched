import { useRegistered } from "@/src/hooks/useMedicalRegistered";
import { Registered } from "@/src/types/medicalregistered";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "long", year: "numeric" }).format(d);
}

function RegisteredCard({ item }: { item: Registered }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/registered/[id]", params: { id: item.id } })}
      style={styles.card}
    >
      <Image source={{ uri: item.imageUri }} style={styles.thumb} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>No Solicitud: {item.noRequest}</Text>
        <Text style={styles.meta}>Fecha: {formatDate(item.dateISO)}</Text>
        <Text style={styles.meta}>Estado: {item.status}</Text>
        {!!item.notes && <Text numberOfLines={1} style={styles.desc}>{item.notes}</Text>}
      </View>
    </Pressable>
  );
}


export default function RegisteredScreen(){
  const { items, loading, reload } = useRegistered();

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={items}
      keyExtractor={i => i.id}
      renderItem={({ item }) => <RegisteredCard item={item} />}
      ListEmptyComponent={<Text>No hay radicados aún.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: "#eee" },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: "#f3f4f6" },
  title: { fontWeight: "700", fontSize: 16 },
  meta: { color: "#6b7280", fontSize: 12 },
  desc: { color: "#374151", fontSize: 12, marginTop: 4 },
});