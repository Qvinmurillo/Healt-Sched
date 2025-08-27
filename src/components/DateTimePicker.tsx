// @/src/components/DateTimePicker.tsx
import { Button } from "@/src/components/Button";
import { HStack } from "@/src/components/HStack";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Platform, StyleSheet, Text } from "react-native";

type Mode = "date" | "time" | "datetime";

export default function DateTimePicker({
  value,
  onChange,
  mode = "date",
}: {
  value: Date;
  onChange: (date: Date) => void;
  mode?: Mode;
}) {
  if (Platform.OS !== "android") return null;

  const openDate = (base: Date = value) =>
    DateTimePickerAndroid.open({
      value: base,
      mode: "date",
      onChange: (_, selected?: Date) => {
        if (!selected) return;
        if (mode === "datetime") openTime(selected);
        else onChange(selected);
      },
    });

  const openTime = (base: Date = value) =>
    DateTimePickerAndroid.open({
      value: base,
      mode: "time",
      is24Hour: true,
      onChange: (_, selected?: Date) => {
        if (!selected) return;
        onChange(selected);
      },
    });

  const handlePress = () => {
    if (mode === "time") openTime();
    else openDate();
  };

  const d = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" }).format(value);
  const t = new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" }).format(value);

  return (
    <HStack p={1} style={styles.row}>
      <Text>
        {mode === "datetime" ? `${d} ${t}` : mode === "time" ? t : d}
      </Text>

      <Button 
      variant="outlined" 
      onPress={handlePress}>Seleccionar
      </Button>
    </HStack>
  );
}
const styles = StyleSheet.create({ 
  row:{ 
    alignItems: "center", 
    justifyContent: "space-between",
  },

});
