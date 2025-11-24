import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../src/context/ThemeContext'; // Tema Bağlantısı

export default function UserProfileScreen() {
  const router = useRouter();
  const { isDark } = useTheme(); // Tema durumu
  
  const params = useLocalSearchParams();
  const { name, score, color } = params;

  const [isFollowing, setIsFollowing] = useState(false);

  // --- GARANTİ RENK PALETİ ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',       // Espresso / Krem
    surface: isDark ? '#342A25' : '#FEF9E7',  // Koyu Deri / Açık Krem
    textMain: isDark ? '#EADDcF' : '#3E322B', // Eski Kağıt / Espresso
    textSec: isDark ? '#9C8F85' : '#8B7E74',  // Kül / Vizon
    border: isDark ? '#4E4039' : '#D4C5B9',   // Koyu Çizgi / Açık Çizgi
    accent: '#D97B56',                        // Yanık Turuncu
    yellow: '#F2CC8F',                        // Hardal
    green: '#83A686',                         // Zeytin
  };

  return (
    <SafeAreaView 
        key={isDark ? 'dark' : 'light'} // Anlık değişim için
        style={{ flex: 1, backgroundColor: colors.bg }} 
        edges={['top']}
    >
      
      {/* Header (Geri Dön) */}
      <View className="px-4 py-2 mb-4">
        <TouchableOpacity 
            onPress={() => router.back()} 
            style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
            className="w-12 h-12 rounded-full items-center justify-center shadow-sm"
        >
            <MaterialIcons name="arrow-back" size={24} color={colors.textMain} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        
        {/* Profil Avatarı ve İsim */}
        <View className="items-center mb-8">
            <View 
                style={{ backgroundColor: color || colors.textSec, borderColor: colors.surface }}
                className="w-32 h-32 rounded-full items-center justify-center border-4 shadow-md mb-4"
            >
                <Text style={{ color: isDark ? '#231E1A' : '#FEF9E7' }} className="text-5xl font-bold opacity-90">
                    {name ? name[0] : '?'}
                </Text>
            </View>
            
            <Text style={{ color: colors.textMain }} className="text-4xl font-black tracking-tight">{name}</Text>
            
            {/* Kullanıcı Durumu */}
            <View 
                style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
                className="px-4 py-2 rounded-full mt-3 shadow-sm flex-row items-center"
            >
                <View className="w-3 h-3 rounded-full bg-[#83A686] mr-2" />
                <Text style={{ color: colors.textSec }} className="text-sm font-medium italic">"Derin odak modundayım... ☕️"</Text>
            </View>
        </View>

        {/* İstatistik Kartları */}
        <View className="flex-row gap-4 mb-10">
            {/* Takipçi Kartı */}
            <View 
                style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
                className="flex-1 p-5 rounded-3xl shadow-sm items-center"
            >
                <Text style={{ color: colors.textMain }} className="text-3xl font-black">1.2K</Text>
                <Text style={{ color: colors.textSec }} className="text-xs font-bold uppercase tracking-widest mt-1">Takipçi</Text>
            </View>

            {/* Odak Skoru Kartı */}
            <View 
                style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
                className="flex-1 p-5 rounded-3xl shadow-sm items-center"
            >
                <View className="flex-row items-center">
                    <MaterialIcons name="star" size={24} color={colors.yellow} />
                    <Text style={{ color: colors.textMain }} className="text-3xl font-black ml-1">{score}</Text>
                </View>
                <Text style={{ color: colors.textSec }} className="text-xs font-bold uppercase tracking-widest mt-1">Odak Skoru</Text>
            </View>
        </View>

        {/* Takip Et Butonu - DÜZELTİLDİ */}
        <TouchableOpacity 
            onPress={() => setIsFollowing(!isFollowing)}
            style={{ 
                backgroundColor: isFollowing ? colors.surface : colors.accent,
                borderColor: isFollowing ? colors.border : 'transparent',
                borderWidth: isFollowing ? 1 : 0,
                borderBottomWidth: 4,
                borderBottomColor: isFollowing ? colors.border : '#00000020'
            }}
            // DÜZELTME: py-5 -> py-4 (Küçültüldü), flex-row ve justify-center eklendi
            className="w-full py-4 rounded-3xl flex-row justify-center items-center shadow-lg active:translate-y-1 active:border-b-0 transition-all mb-8"
        >
            <Text 
                style={{ color: isFollowing ? colors.textSec : '#FEF9E7' }}
                // DÜZELTME: text-xl -> text-lg (Yazı küçüldü)
                className="text-lg font-black tracking-wider"
                numberOfLines={1} // Tek satıra zorla
            >
                {isFollowing ? 'TAKİP EDİLİYOR' : 'TAKİP ET'}
            </Text>
        </TouchableOpacity>

        {/* Rozetler Bölümü */}
        <View 
            style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
            className="p-6 rounded-3xl mb-10"
        >
            <Text style={{ color: colors.textMain }} className="text-lg font-bold mb-4">Rozetler</Text>
            <View className="flex-row gap-3">
                <View style={{ backgroundColor: isDark ? '#F2CC8F20' : '#F2CC8F40', borderColor: colors.yellow }} className="px-3 py-2 rounded-xl border">
                    <Text style={{ color: colors.textMain }} className="text-xs font-bold">🏆 Erken Kalkan</Text>
                </View>
                <View style={{ backgroundColor: isDark ? '#D97B5620' : '#D97B5640', borderColor: colors.accent }} className="px-3 py-2 rounded-xl border">
                    <Text style={{ color: colors.textMain }} className="text-xs font-bold">🔥 10 Gün Seri</Text>
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}