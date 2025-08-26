import { useRegistered } from "@/src/hooks/useMedicalRegistered";
import { Registered } from "@/src/types/medicalregistered";
import { generateRequestNumber } from "@/src/utils/storage/registered";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export default function NewRegistered (){
const { add } = useRegistered();
  const [notes, setNotes] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onSave = async () => {
    if (!imageUri) return Alert.alert("Falta la foto del radicado");
    const record: Registered = {
      id: uuid(),
      noRequest: await generateRequestNumber(),
      dateISO: new Date().toISOString(),   // fecha del sistema
      status: "En Espera",
      notes: notes.trim(),
      answer: "",
      imageUri,
      created_At: new Date().toISOString(),
    };
    await add(record);
    router.replace("/(auth)/(tabs)/(registered)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        placeholder="Describa brevemente..."
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Button title="Tomar foto" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      <Button title="Guardar" onPress={onSave} />
      {!imageUri && <Text style={{ color: "#6b7280" }}>Adjunte su radicado.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  label: { fontSize: 12, color: "#6b7280" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#e5e7eb" },
  preview: { width: "100%", height: 220, marginTop: 12, borderRadius: 10, backgroundColor: "#f3f4f6" },
});