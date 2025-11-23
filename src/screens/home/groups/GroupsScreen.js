import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GROUPS = [
    { id: '1', name: 'Sabah Koşucuları', icon: '🏃‍♂️', lastMessage: 'Yarın 07:00 sahil?', time: '09:41' },
    { id: '2', name: 'Kitap Kulübü', icon: '📚', lastMessage: 'Yeni kitap seçimi harika.', time: 'Dün' },
    { id: '3', name: 'Kodlama Kampı', icon: '💻', lastMessage: 'Repo linkini attım.', time: 'Pzt' },
    { id: '4', name: 'Yoga & Meditasyon', icon: '🧘‍♀️', lastMessage: 'Nefes egzersizlerini unutmayın.', time: 'Pzt' },
];

export default function GroupsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-5 flex-row justify-between items-center bg-page">
        <Text className="text-3xl font-bold text-dark tracking-tight">Sohbetler</Text>
        
        {/* Yeni Grup Ekle Butonu - Daha Retro ve Renkli */}
        <TouchableOpacity 
            className="flex-row items-center bg-accent px-5 py-3 rounded-full shadow-sm"
            onPress={() => alert("Yakında!")}
        >
           <MaterialIcons name="add" size={20} color="#FEF9E7" />
           <Text className="text-surface font-bold ml-2">Yeni Grup</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={GROUPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-surface p-4 mb-4 rounded-3xl flex-row items-center shadow-sm border border-light/50"
            activeOpacity={0.7}
          >
             {/* Grup İkonu - Hafif sarımsı retro arka plan */}
             <View className="w-16 h-16 rounded-2xl bg-yellow/20 items-center justify-center mr-5 border border-yellow/30">
                <Text className="text-3xl">{item.icon}</Text>
             </View>
             
             {/* Mesaj İçeriği */}
             <View className="flex-1 justify-center">
               <View className="flex-row justify-between mb-1 items-center">
                   <Text className="text-lg font-bold text-dark">{item.name}</Text>
                   <Text className="text-xs text-medium font-medium">{item.time}</Text>
               </View>
               <Text className="text-medium text-sm" numberOfLines={1}>{item.lastMessage}</Text>
             </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}