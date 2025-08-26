import { IconSymbol } from "@/components/ui/IconSymbol";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ClinicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Citas",
          headerRight: () => (
            <Link href="new" asChild>
              <Pressable style={{ paddingHorizontal: 10 }}>
                <IconSymbol name="add.outline" size={22} color={"black"} style={null} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="clinic/[id]" options={{ title: "Detalle de Cita" }} />
      <Stack.Screen name="new" options={{ title: "Agendar Cita" }}/>
    </Stack>
  );
}
