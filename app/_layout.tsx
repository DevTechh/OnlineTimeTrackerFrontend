import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Durum çubuğunu koyu yapıyoruz (dark), çünkü arka planımız açık renk (krem).
         Böylece saat, pil vb. siyah görünür. 
      */}
      <StatusBar style="dark" />
      
      <Stack screenOptions={{ headerShown: false }}>
        {/* Giriş ve Kayıt Ekranları */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        
        {/* Ana Tab Menüsü */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Ayarlar Modalı - DÜZELTİLDİ */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', // Aşağıdan yukarı açılan modal efekti
            headerShown: false,    // O mor native başlığı tamamen gizledik!
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}