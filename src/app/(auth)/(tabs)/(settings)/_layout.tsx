import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={ { headerBackTitle: "Settings" } }>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings/[id]" />
    </Stack>
  );
}