import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

//import { useColorScheme } from '@/hooks/useColorScheme';
import { useColorScheme } from '../hooks/useColorScheme.web';
import AuthProvider from '../services/authProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    //SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf')
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/*Se encapsula el Slot, dentro del provedor que va a generar la autenticacion de datos el usuario*/}
      <AuthProvider>
        <Slot />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
