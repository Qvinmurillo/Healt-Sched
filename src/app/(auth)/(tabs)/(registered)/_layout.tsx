import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function RegisteredLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Radicados",
          headerRight: () => (
            <Link href="new" asChild>
              <Pressable style={{ paddingHorizontal: 10 }}>
                <IconSymbol name="add.outline" size={22} color={"black"} style={null} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="registered/[id]" options={{ title: "Detalle de su Radicado" }} />
      <Stack.Screen name="new" options={{ title: "Genere su radicado" }}/>
    </Stack>
  );
}