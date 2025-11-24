import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

// StatusBar'ı temaya göre ayarlayan yardımcı bileşen
function ThemedStatusBar() {
  const { isDark } = useTheme();
  // Karanlık moddaysa ikonlar beyaz (light), aydınlık moddaysa siyah (dark) olsun
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemedStatusBar />
        
        <Stack screenOptions={{ headerShown: false }}>
          {/* Giriş ve Kayıt Ekranları */}
          <Stack.Screen name="index" /> 
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
          
          {/* Ana Tab Menüsü */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Ayarlar Modalı */}
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: 'modal', 
              headerShown: false,    
            }} 
          />
          
          {/* Flow Modu */}
          <Stack.Screen name="flow/active" options={{ headerShown: false }} />
          
          {/* Dinamik Sayfalar (Grup ve Profil Detay) */}
          <Stack.Screen name="groups/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}