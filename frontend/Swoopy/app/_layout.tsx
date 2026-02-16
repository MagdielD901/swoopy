import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // Asegura que al recargar, sepa que el flujo principal termina en (tabs)
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* El Stack es el contenedor de tus pantallas. 
        screenOptions={{ headerShown: false }} quita la barra de título de arriba.
      */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* 1. Pantalla de inicio (Preloader) */}
        <Stack.Screen name="index" />

        {/* 2. Pantalla de partículas (Login principal) */}
        <Stack.Screen name="screens/principal_login" />

        {/* 3. Pantalla de formulario de Login */}
        <Stack.Screen name="screens/LoginScreen" />

        {/* 4. El grupo de pestañas (Home, Explore, etc.) */}
        <Stack.Screen name="(tabs)" />

        {/* 5. Modales u otras pantallas extras */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}