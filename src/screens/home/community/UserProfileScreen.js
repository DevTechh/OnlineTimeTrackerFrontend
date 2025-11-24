import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserProfileScreen() {
  const router = useRouter();
  // URL'den gelen parametreleri alıyoruz (isim, puan, renk vb.)
  const params = useLocalSearchParams();
  const { name, score, color } = params;

  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      
      {/* Header (Geri Dön) */}
      <View className="px-4 py-2 mb-4">
        <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-12 h-12 bg-surface rounded-full border border-light/50 items-center justify-center shadow-sm"
        >
            <MaterialIcons name="arrow-back" size={24} color="#3E322B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        
        {/* Profil Avatarı ve İsim */}
        <View className="items-center mb-8">
            <View 
                className="w-32 h-32 rounded-full items-center justify-center border-4 border-surface shadow-md mb-4"
                style={{ backgroundColor: color || '#D4C5B9' }}
            >
                <Text className="text-5xl font-bold text-surface/90">{name ? name[0] : '?'}</Text>
            </View>
            
            <Text className="text-4xl font-black text-dark tracking-tight">{name}</Text>
            
            {/* Kullanıcı Durumu */}
            <View className="bg-surface px-4 py-2 rounded-full mt-3 border border-light/50 shadow-sm flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-green mr-2" />
                <Text className="text-medium text-sm font-medium italic">"Derin odak modundayım... ☕️"</Text>
            </View>
        </View>

        {/* İstatistik Kartları (Takipçi & Skor) */}
        <View className="flex-row gap-4 mb-10">
            {/* Takipçi Kartı */}
            <View className="flex-1 bg-surface p-5 rounded-3xl border border-light/40 shadow-sm items-center">
                <Text className="text-3xl font-black text-dark">1.2K</Text>
                <Text className="text-medium text-xs font-bold uppercase tracking-widest mt-1">Takipçi</Text>
            </View>

            {/* Odak Skoru Kartı */}
            <View className="flex-1 bg-surface p-5 rounded-3xl border border-light/40 shadow-sm items-center">
                <View className="flex-row items-center">
                    <MaterialIcons name="star" size={24} color="#F2CC8F" />
                    <Text className="text-3xl font-black text-dark ml-1">{score}</Text>
                </View>
                <Text className="text-medium text-xs font-bold uppercase tracking-widest mt-1">Odak Skoru</Text>
            </View>
        </View>

        {/* Takip Et Butonu */}
        <TouchableOpacity 
            onPress={() => setIsFollowing(!isFollowing)}
            className={`w-full py-5 rounded-3xl items-center shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all mb-8 ${
                isFollowing 
                ? 'bg-surface border-light' 
                : 'bg-accent border-dark/10'
            }`}
        >
            <Text className={`text-xl font-black tracking-wider ${isFollowing ? 'text-medium' : 'text-surface'}`}>
                {isFollowing ? 'TAKİP EDİLİYOR' : 'TAKİP ET'}
            </Text>
        </TouchableOpacity>

        {/* Hakkında / Rozetler Bölümü */}
        <View className="bg-surface p-6 rounded-3xl border border-light/40 mb-10">
            <Text className="text-lg font-bold text-dark mb-4">Rozetler</Text>
            <View className="flex-row gap-3">
                <View className="bg-yellow/20 px-3 py-2 rounded-xl border border-yellow/30">
                    <Text className="text-dark text-xs font-bold">🏆 Erken Kalkan</Text>
                </View>
                <View className="bg-accent/20 px-3 py-2 rounded-xl border border-accent/30">
                    <Text className="text-dark text-xs font-bold">🔥 10 Gün Seri</Text>
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}