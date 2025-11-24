import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../context/ThemeContext'; // Tema Bağlantısı

import FlowScreen from '../flowpanel/FlowScreen';
import ProfileContent from './ProfileContent';

export default function ProfileScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  // Renk Tanımları
  const bgColor = isDark ? '#231E1A' : '#F0EAD6'; // Espresso / Krem
  const iconColor = isDark ? '#EADDcF' : '#3E322B'; // Kağıt / Kahve
  const iconBg = isDark ? '#342A25' : '#FEF9E7'; // Koyu Deri / Açık Krem
  const borderColor = isDark ? '#4E4039' : '#D4C5B9';

  return (
    <SafeAreaView 
      key={isDark ? 'dark' : 'light'} // Re-render tetikleyici
      style={{ flex: 1, backgroundColor: bgColor }} 
      edges={['top', 'left', 'right']}
    >
      
      {/* Ayarlar Butonu */}
      <View className="absolute top-14 right-6 z-50">
         <TouchableOpacity 
            onPress={() => router.push('/modal')}
            style={{ 
                backgroundColor: iconBg, 
                borderColor: borderColor, 
                borderWidth: 1 
            }}
            className="p-3 rounded-full shadow-sm"
            activeOpacity={0.7}
         >
            <MaterialIcons name="settings" size={26} color={iconColor} />
         </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        bounces={false}
      >
        <View className="w-screen">
          <ProfileContent />
        </View>
        <View className="w-screen">
          <FlowScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}