import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const USERS = [
  { id: '1', name: 'Sarah', score: 980, color: '#F2CC8F' }, // Hardal Sarısı (Altın yerine)
  { id: '2', name: 'Samuel', score: 870, color: '#D4C5B9' }, // Sütlü Kahve (Gümüş yerine)
  { id: '3', name: 'Sandra', score: 860, color: '#D97B56' }, // Yanık Turuncu (Bronz yerine)
  { id: '4', name: 'Sophie', score: 850, color: '#EBBAB9' }, // Gül Kurusu
  { id: '5', name: 'Stephen', score: 830, color: '#83A686' }, // Zeytin Yeşili
];

export default function CommunityScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-surface mb-3 border border-light/50 rounded-3xl shadow-sm mx-1"
      activeOpacity={0.7}
    >
      <Text className="font-bold w-8 text-lg text-medium">{index + 1}.</Text>
      
      {/* Profil Avatarı */}
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mr-4 border-2 border-surface shadow-sm" 
        style={{ backgroundColor: item.color }}
      >
        <Text className="font-bold text-xl text-dark opacity-80">{item.name[0]}</Text>
      </View>
      
      <View className="flex-1">
        <Text className="text-lg font-bold text-dark">{item.name}</Text>
        <Text className="text-medium text-xs font-medium uppercase tracking-wide">
            {item.score} Puan
        </Text>
      </View>
      
      <View className="bg-page p-2 rounded-full">
        <MaterialIcons name="chevron-right" size={20} color="#8B7E74" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      {/* Header Alanı */}
      <View className="px-6 pt-4 pb-6 z-10">
        <Text className="text-3xl font-bold mb-5 text-dark tracking-tight">Liderlik Tablosu</Text>
        
        {/* Arama Çubuğu - Retro Stil */}
        <View className="bg-surface flex-row items-center rounded-2xl px-4 py-3 border-2 border-light shadow-sm">
           <MaterialIcons name="search" size={24} color="#8B7E74" />
           <TextInput 
             className="flex-1 ml-3 text-lg text-dark font-medium" 
             placeholder="Arkadaşlarını bul..." 
             placeholderTextColor="#D4C5B9"
             value={search}
             onChangeText={setSearch}
           />
        </View>
      </View>
      
      {/* İlk 3 Sıralama Kürsüsü - Nostaljik Renkler */}
      <View className="flex-row justify-center items-end pb-8 pt-4 mb-2 border-b border-light/30 bg-page">
         {/* 2. Sıra */}
         <View className="items-center mx-2 z-10">
            <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-2 border-4 border-light shadow-sm">
                <Text className="text-3xl font-black text-light">2</Text>
            </View>
            <Text className="font-bold text-dark text-base">Samuel</Text>
            <Text className="text-xs text-medium font-bold">870 P</Text>
            {/* Kürsü Bloğu */}
            <View className="w-20 h-24 bg-light/40 mt-2 rounded-t-lg border-x-2 border-t-2 border-light/50" />
         </View>
         
         {/* 1. Sıra */}
         <View className="items-center mx-2 z-20 -mb-2">
            <MaterialIcons name="emoji-events" size={36} color="#F2CC8F" className="mb-1" />
            <View className="w-24 h-24 rounded-full bg-yellow items-center justify-center mb-2 border-4 border-surface shadow-md">
                <Text className="text-4xl font-black text-dark/80">1</Text>
            </View>
            <Text className="font-bold text-dark text-lg">Sarah</Text>
            <Text className="text-sm text-accent font-bold">980 P</Text>
            {/* Kürsü Bloğu */}
            <View className="w-24 h-32 bg-yellow/40 mt-2 rounded-t-lg border-x-2 border-t-2 border-yellow/50 flex items-center justify-center">
                <Text className="text-yellow font-black text-4xl opacity-50">1</Text>
            </View>
         </View>
         
         {/* 3. Sıra */}
         <View className="items-center mx-2 z-10">
            <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-2 border-4 border-accent/40 shadow-sm">
                <Text className="text-3xl font-black text-accent/60">3</Text>
            </View>
            <Text className="font-bold text-dark text-base">Sandra</Text>
            <Text className="text-xs text-medium font-bold">860 P</Text>
            {/* Kürsü Bloğu */}
            <View className="w-20 h-16 bg-accent/20 mt-2 rounded-t-lg border-x-2 border-t-2 border-accent/30" />
         </View>
      </View>

      <FlatList
        data={USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}